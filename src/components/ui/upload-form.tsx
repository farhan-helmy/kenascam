'use client';

import type { ChangeEvent, DragEventHandler } from 'react';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UploadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { useToast } from './use-toast';
import { DeleteFile, UploadFile } from '@/lib/server/s3';
import { Button } from '@/components/ui/button';

type UploadFormProps = {
  fileKey: string[]
  setFileKey: (key: string[]) => void
};

const UploadForm = ({ fileKey, setFileKey }: UploadFormProps) => {
  const {toast} = useToast();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [images, setImages] = useState<
    {
      fileName: string;
      url: string;
    }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // upload file mutation
  const uploadFileMutation = useMutation({
    mutationFn: UploadFile,
    mutationKey: ['uploadFile'],
  });

  // handle drag events
  const handleDrag: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();

      // Iterate through each file and append it to the FormData
      for (const element of e.target.files) {
        console.log(element);
        formData.append('file', element);
      }

      uploadFileMutation
        .mutateAsync(formData)
        .then(res => {
          setImages([...res.body]);
          setFileKey([...fileKey, ...res.body.map(image => image.fileName)]);
          toast({
            description: 'Upload successful!',
            title: 'Success',
          });
        })
        .catch(err => {
          console.error(err);
          toast({
            description: err.message || 'An error occurred during upload.',
            title: 'Error',
          });
        });
    }
  };

  const deleteImage = async (fileName: string) => {
    const res = await DeleteFile(fileName);

    if (!res.success) {
      toast({
        description: "Something went wrong",
        title: 'Error',
      });
      return;
    }

    toast({
      description: 'Deleted!',
      title: 'Success',
    });

    setImages(images.filter(image => image.fileName !== fileName));
    setFileKey(fileKey.filter(key => key !== fileName));
  }

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div
        className="flex w-full items-center justify-center pt-2"
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={e => e.preventDefault()}
      >
        <input
          accept="image/*,application/pdf"
          className="hidden"
          id="input-file-upload"
          multiple={true}
          onChange={handleChange}
          ref={inputRef}
          type="file"
        />
        <label
          className="flex h-full w-1/2 items-center justify-center"
          htmlFor="input-file-upload"
          id="label-file-upload"
        >
          <div className="shadow-default-md flex h-fit w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-solid border-black bg-white py-10 hover:bg-gray-200">
            <span className="text-5xl text-purple-900">
              <UploadIcon />
            </span>
            <Button
              className="bg-black text-white hover:bg-gray-400 active:bg-black disabled:bg-cyan-900"
              disabled={uploadFileMutation.isPending}
              onClick={onButtonClick}
              type="button"
            >
              {uploadFileMutation.isPending ? 'Uploading...' : 'Browse My files'}
            </Button>
            <p className="mt-2 text-xs text-slate-900">Supported files: jpg, png, pdf</p>
          </div>
        </label>

        {dragActive && (
          <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} />
        )}
      </div>
      {images.length > 0 && (
        <div className="flex flex-col items-center gap-2 pt-4">
          <div className="text-xs">Images</div>
          <div className="flex flex-row gap-2">
            {images.map(image => (
              <div className="relative" key={image.fileName}>
                <Image
                  alt={image.fileName}
                  className="rounded-md border border-red-400"
                  height={120}
                  src={image.url}
                  width={80}
                />
                <XIcon
                  onClick={() => deleteImage(image.fileName)}
                  className="absolute right-0 top-0 h-4 w-4 cursor-pointer text-white hover:text-red-600" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UploadForm;
