"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { UploadFile } from "@/lib/server/s3";
import { UploadIcon } from "@radix-ui/react-icons";
import { useToast } from "./use-toast";

const UploadForm = () => {
    const toast = useToast();
    const [dragActive, setDragActive] = useState<boolean>(false);
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

    // triggers when file is dropped
    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) {
            const formData = new FormData();
            formData.append("file", e.target.files?.[0]);

            uploadFileMutation.mutateAsync(formData)
                .then((res) => {
                    toast.toast({
                        title: "Success",
                        description: "Upload successful!",
                    })
                })
                .catch((err) => {
                    toast.toast({
                        title: "Error",
                        description: err,
                    })
                })
        }
    };

    // triggers when file is selected with click
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files?.[0]) {
            const formData = new FormData();
            console.log(e.target.files?.[0]);
            formData.append("file", e.target.files?.[0]);
            uploadFileMutation.mutateAsync(formData)
                .then((res) => {
                    console.log(res);
                    toast.toast({
                        title: "Success",
                        description: "Upload successful!",
                    })
                })
                .catch((err) => {
                    console.log(err);
                    toast.toast({
                        title: "Error",
                        description: err,
                    })
                })
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        // @ts-ignore
        inputRef.current.click();
    };

    return (
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
                <div className="bg-purple-300 hover:bg-purple-200 w-full h-fit py-10 flex flex-col items-center gap-2 justify-center cursor-pointer shadow-default-md border-2 border-solid border-black rounded-lg">
                    <span className="text-5xl text-purple-900">
                        <UploadIcon />
                    </span>
                    <p className="text-black text-sm">Drag and drop files</p>
                    <p className="text-purple-900 text-sm">Or if you prefer</p>
                    <Button
                        type="button"
                        onClick={onButtonClick}
                        className="bg-cyan-300 hover:bg-cyan-400 active:bg-cyan-500 disabled:bg-cyan-900"
                        disabled={uploadFileMutation.isPending}
                    >
                        {uploadFileMutation.isPending ? "Uploading..." : "Browse My files"}
                    </Button>
                    <p className="text-purple-900 text-sm mt-2">
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
                    onDrop={handleDrop}
                />
            )}
        </div>
    );
};

export default UploadForm;
