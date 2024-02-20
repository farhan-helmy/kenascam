/* eslint-disable @typescript-eslint/no-unnecessary-condition */
'use client';

import type { ChangeEvent, DragEventHandler, FormEvent } from 'react';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UploadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { toast } from 'sonner';
import { DeleteFile, UploadFile } from '@/lib/server/s3';
import { Button } from '@/components/ui/button';

type UploadFormProps = {
  fileKey: string[];
  setFileKey: (key: string[]) => void;
};

const UploadForm = ({ fileKey, setFileKey }: UploadFormProps) => {
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
   
        formData.append('file', element);
      }

      uploadFileMutation
        .mutateAsync(formData)
        .then(res => {
          setImages([...res.body]);
          setFileKey([...fileKey, ...res.body.map(image => image.fileName)]);
          toast('Image uploaded!', {
            description: 'Image has been uploaded successfully',
          });
        })
        .catch(err => {
          console.error(err);
          toast('An error occurred during upload.', {
            description: err.message || 'An error occurred during upload.',
          });
        });
    }
  };

  const deleteAllImages = async (e: FormEvent) => {
    e.preventDefault();
    for (const key of fileKey) {
      const res = await DeleteFile(key);
      if (!res.success) {
        toast('Error', {
          description: 'Something went wrong',
        });
        return;
      }
    }

    toast('All image deleted!');

    setImages([]);
    setFileKey([]);
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      {images.length > 0 ? (
        <div className="flex flex-col items-center gap-2 pt-4">
          <Button variant="secondary" onClick={e => deleteAllImages(e)}>
            Clear all images
          </Button>
          <div className="flex flex-row gap-2">
            {images.map(image => (
              <div className="h-full" key={image.fileName}>
                <Image
                  alt={image.fileName}
                  className="rounded-md border border-red-400"
                  height={150}
                  src={image.url}
                  width={200}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default UploadForm;
