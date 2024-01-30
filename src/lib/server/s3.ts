/* eslint-disable @typescript-eslint/no-unnecessary-condition */
'use server';

import { revalidatePath } from 'next/cache';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
  region: 'ap-southeast-1',
});

async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = file;

  // Check file size
  const fileSizeInBytes = fileBuffer.byteLength;
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
  console.log('fileSizeInMB: ', fileSizeInMB);
  if (fileSizeInMB > 2) {
    throw new Error('File size is too large');
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
    Body: resizedFile,
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    ContentType: '*/*',
    Key: `${Date.now()}-${fileName}`,
  };

  console.log(process.env.AWS_S3_BUCKET_NAME as string);

  const command = new PutObjectCommand(params);

  await s3Client.send(command);
  return params.Key;
}

export async function UploadFile(formData: FormData) {
  try {
    const files = formData.getAll('file') as File[];

    if (!files || files.length === 0) {
      throw new Error('No files');
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
    revalidatePath('/');

    return {
      body: results,
      success: true,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
}

export async function DeleteFile(key: string) {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    const res = await s3Client.send(command);

    console.log(res)
    return {
      success: true,
    };
  } catch (err) {
    console.error('Error deleting file:', err);
    throw new Error('Error deleting file');
  }
}
