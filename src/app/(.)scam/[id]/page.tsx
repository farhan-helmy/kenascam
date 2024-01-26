'use client';

import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
import { ArrowDown, ArrowUp, SendHorizonalIcon, SendIcon, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ImageGallery = () => {
  return (
    <div className="xl:h-screen lg:h-screen md:h-screen px-12 pt-6">
      <Carousel className="w-full xl:max-w-[800px] lg:max-w-[700px] md:max-w-[600px]">
        <CarouselContent>
          <CarouselItem>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <Image
                  alt="scam"
                  height={500}
                  src="/examplescam1.jpg"
                  width={500}
                />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <Image
                  alt="scam"
                  height={500}
                  src="/examplescam2.jpg"
                  width={500}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

const Details = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scam Name</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Badge variant="destructive">Scam</Badge>
          <Badge variant="secondary">Scam</Badge>
          <Badge variant="secondary">Scam</Badge>
        </div>
        <div className='flex justify-between px-24 pt-4'>
          <div className='flex flex-col items-center justify-center gap-1 text-white hover:text-green-500'>
            <button>
              <ArrowUp className="h-6 w-6 " />
            </button>
            <Label className="text-xs italic font-light">Upvote</Label>
          </div>

          <div className='flex flex-col items-center justify-center gap-1 text-white hover:text-red-500'>
            <button>
              <ArrowDown className="h-6 w-6 " />
            </button>
            <Label className="text-xs italic font-light">Downvote</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const CommentSection = () => {
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
        {Array.from(Array(10).keys()).map((_, index) => (
          <div className='flex flex-row gap-2' key={index}>
            <Avatar>
              <AvatarImage src="https://github.com/farhan-helmy.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='rounded-md bg-gray-700 text-xs p-2 w-full max-w-80 xl:max-w-96 lg:max-w-64 max-w md:max-w-64 h-full text-wrap'>
              <div>
                <span className='font-bold'>farhan</span>
                <span className='text-gray-400'> 1 day ago</span>
              </div>
              <p className='break-words pt-1'>
                No, I'm not a scammer. I'm just a normal person who wants to scam people. testtttttttttttttttttttesttttttttttttttttttttesttttttttttttttttttttesttttttttttttttttttttesttttttttttttttttttt
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

const ScamModal = () => {
  const router = useRouter();

  return (
    <div className="xl:grid lg:grid md:grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3">
      <button className='absolute top-1 left-1'>
        <X className="h-6 w-6 text-white hover:text-gray-500" onClick={() => router.back()} />
      </button>
      <div className="xl:col-span-2 lg:col-span-2 md:col-span-2">
        <ImageGallery />
      </div>
      <div className="flex flex-col p-4">
        <div className='rounded-md w-full'>
          <Details />
        </div>
        <div className='pt-4'>
          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default ScamModal;
