'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowDown, ArrowUp, SendHorizonalIcon, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Comments, Scam, Image as ImageType } from '@/service/scam';
import { getScam } from '@/service/scam';
import { transformFormat } from '@/app/browse/page';

type ImageGalleryProps = {
  images: ImageType[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="xl:h-screen lg:h-screen md:h-screen px-12 pt-6">
      <Carousel className="w-full xl:max-w-[800px] lg:max-w-[700px] md:max-w-[600px]">
        <CarouselContent>
          {images.map(image => (
            <CarouselItem key={image.id}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <Image
                    alt="scam"
                    height={500}
                    src={image.url}
                    width={500}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

type DetailProps = {
  scam: Scam
}

const Details = ({ scam }: DetailProps) => {
  return (
    <Card>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle>{scam.name}</CardTitle>
        <div className='flex gap-4'>
          <div className='flex flex-col items-center justify-center gap-1 text-white hover:text-green-500'>
            <button>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <div className='flex flex-col items-center justify-center gap-1 text-white hover:text-red-500'>
            <button>
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className='text-sm text-gray-200 break-words max-w-80'>
          {scam.description}
        </div>
        <div className="flex flex-row gap-2 pt-2">
          {scam.scamToTags.map(tag => (
            <Badge key={tag.tagId} variant="destructive">{transformFormat(tag.tagId)}</Badge>
          ))}
        </div>
        <div className='text-xs pt-4 text-gray-400'>
          0 Upvote 0 Downvote
        </div>
      </CardContent>
      <CardFooter className='text-xs text-gray-300'>
        <p> Uploaded by <span className='text-gray-400'>Anon</span> 1 day ago</p>
      </CardFooter>
    </Card>
  )
}

type CommenSectionProps = {
  comments: Comments[]
  loading?: boolean
}

const CommentSection = ({ comments, loading }: CommenSectionProps) => {
  console.log(comments)

  if (loading) {
    return <div>
      fetching comments...
    </div>
  }

  if (comments.length === 0) {
    return <div>
      No comments yet
    </div>
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Textarea />
          <button className='flex justify-end text-end pr-1'>
            <SendHorizonalIcon className="h-4 w-4 text-white hover:text-gray-500" />
          </button>
        </CardContent>
      </Card>
      <div className='flex flex-col pt-8 px-4 gap-2 h-[440px] overflow-auto'>
        {comments.map(comment => (
          <div className='flex flex-row gap-2' key={comment.id}>
            <Avatar>
              <AvatarImage src="https://github.com/farhan-helmy.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='rounded-md bg-gray-700 text-xs p-2 w-full max-w-80 xl:max-w-96 lg:max-w-64 max-w md:max-w-64 h-full text-wrap'>
              <div>
                <span className='font-bold'>{comment.nickname}</span>
                <span className='text-gray-400'>{comment.createdAt}</span>
              </div>
              <p className='break-words pt-1'>
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Scam({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [commentLoading, setCommentLoading] = useState(false);

  const scam = useQuery({
    queryKey: [params.id],
    queryFn: () => getScam(params.id)
  })

  console.log(scam)
  return (
    <div className="xl:grid lg:grid md:grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3">
      <button className='absolute top-1 left-1'>
        <X className="h-6 w-6 text-white hover:text-gray-500" onClick={() => router.back()} />
      </button>
      <div className="xl:col-span-2 lg:col-span-2 md:col-span-2">
        <ImageGallery images={scam.data?.images as ImageType[]} />
      </div>
      <div className="flex flex-col p-4">
        <div className='rounded-md w-full'>
          <Details scam={scam.data as Scam} />
        </div>
        <div className='pt-4'>
          <CommentSection comments={scam.data?.comments as Comments[]} loading={commentLoading} />
        </div>
      </div>
    </div>
  );
};
