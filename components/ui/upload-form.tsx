"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { UploadFile } from "@/lib/server/s3";
import { UploadIcon } from "@radix-ui/react-icons";
import { useToast } from "./use-toast";
import Image from "next/image";
import { XIcon } from "lucide-react";

const UploadForm = () => {
    const toast = useToast();
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [images, setImages] = useState<{
        fileName: string,
        url: string,
    }[]>([]);
    const inputRef = useRef(null);

    // upload file mutation
    const uploadFileMutation = useMutation({
        mutationKey: ["uploadFile"],
        mutationFn: UploadFile,
    });

    // handle drag events
    const handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is selected with click
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files && e.target.files.length > 0) {
            const formData = new FormData();

            // Iterate through each file and append it to the FormData
            for (let i = 0; i < e.target.files.length; i++) {
                console.log(e.target.files[i])
                formData.append("file", e.target.files[i]);
            }

            uploadFileMutation.mutateAsync(formData)
                .then((res) => {

                    setImages([...res.body]);
                    toast.toast({
                        title: "Success",
                        description: "Upload successful!",
                    })
                })
                .catch((err) => {
                    console.error(err);
                    toast.toast({
                        title: "Error",
                        description: err.message || "An error occurred during upload.",
                    })
                });
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        // @ts-ignore
        inputRef.current.click();
    };

    return (
        <>
            <div
                id="form-file-upload"
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
                className="w-full flex items-center justify-center"
            >
                <input
                    ref={inputRef}
                    type="file"
                    id="input-file-upload"
                    multiple={true}
                    onChange={handleChange}
                    className="hidden"
                    accept="image/*,application/pdf"
                />
                <label
                    id="label-file-upload"
                    htmlFor="input-file-upload"
                    className="w-1/2 h-full flex items-center justify-center"
                >
                    <div className="bg-white hover:bg-gray-200 w-full h-fit py-10 flex flex-col items-center gap-2 justify-center cursor-pointer shadow-default-md border-2 border-solid border-black rounded-lg">
                        <span className="text-5xl text-purple-900">
                            <UploadIcon />
                        </span>
                        <Button
                            type="button"
                            onClick={onButtonClick}
                            className="bg-black hover:bg-gray-400 active:bg-black text-white disabled:bg-cyan-900"
                            disabled={uploadFileMutation.isPending}
                        >
                            {uploadFileMutation.isPending ? "Uploading..." : "Browse My files"}
                        </Button>
                        <p className="text-slate-900 text-xs mt-2">
                            Supported files: jpg, png, pdf
                        </p>
                    </div>
                </label>

                {dragActive && (
                    <div
                        id="drag-file-element"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                    />
                )}
            </div>
            {
                images.length > 0 ? (
                    <div className="flex flex-col gap-2 pt-4 items-center">
                        <div className="text-xs">
                            Images
                        </div>
                        <div className="flex flex-row gap-2">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <Image height={120} width={80} src={image.url} alt={image.fileName} className="border rounded-md border-red-400" />
                                    <XIcon className="absolute top-0 right-0 w-4 h-4 text-white hover:text-red-600 cursor-pointer" />
                                </div>
                            ))}
                        </div>

                    </div>
                ) : ""
            }
        </>
    );
};

export default UploadForm;
