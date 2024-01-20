"use server"

import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});


async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = file;

  // Check file size
  const fileSizeInBytes = fileBuffer.byteLength;
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
  console.log("fileSizeInMB: ", fileSizeInMB);
  if (fileSizeInMB > 2) {
    throw new Error("File size is too large");
  }

  const resizedFile = fileBuffer;

  // let resizedFile = fileBuffer;
  // if (fileSizeInMB > 0.2) {
  //   // Resize image if file size is greater than 200KB
  //   resizedFile = await sharp(fileBuffer)
  //     .resize(1000, 1000, {
  //       fit: "inside",
  //       withoutEnlargement: true,
  //     })
  //     .withMetadata()
  //     .toFormat("webp", { quality: 80 })
  //     .toBuffer();
  // }

  // const resizedFileSizeInBytes = resizedFile.byteLength;
  // const resizedFileSizeInMB = resizedFileSizeInBytes / (1024 * 1024);
  // console.log("resizedFileSizeInMB: ", resizedFileSizeInMB);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: `${Date.now()}-${fileName}`,
    Body: resizedFile,
    ContentType: "*/*",
  };

  console.log(process.env.AWS_S3_BUCKET_NAME as string)

  const command = new PutObjectCommand(params);
  
  await s3Client.send(command);
  return params.Key;
}

export async function UploadFile(formData: FormData) {
  try {
    const files = formData.getAll("file") as File[];

    if (!files || files.length === 0) {
      throw new Error("No files");
    }

    const results = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = await uploadFileToS3(buffer, file.name);
      results.push({
        fileName,
        url: `https://d8f7wymmosp6f.cloudfront.net/${fileName}`,
      });
    }

    // Revalidate cache
    revalidatePath("/");

    return {
      success: true,
      body: results,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Error uploading file");
  }
}
