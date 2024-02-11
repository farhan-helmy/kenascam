'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowDown, ArrowUp, SendHorizonalIcon, X } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Comments, Scam, Image as ImageType } from '@/service/scam';
import { getScam, voteScam } from '@/service/scam';
import { transformFormat } from '@/app/browse/page';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


const platformWriting = (platform: string) => {
  switch (platform) {
    case 'facebook':
      return "Here is the scammer's Facebook profile or page URL"
    case 'whatsapp':
      return "Here is the scammer's WhatsApp number"
    case 'x':
      return "Here is the scammer's X username"
    case 'telegram':
      return "Here is the scammer's Telegram username"
    case 'phone-call':
      return "Here is the scammer's phone number"
    case 'email':
      return "Here is the scammer's email"
    case 'other':
      return "Here is the scammer's other contact info"
    default:
      return "Here is the scammer's contact info"

  }
}

type ImageGalleryProps = {
  images: ImageType[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="xl:h-screen lg:h-screen md:h-screen px-12 pt-6">
      <Carousel className="w-full xl:max-w-[800px] lg:max-w-[700px] md:max-w-[600px]">
        <CarouselContent>
          {images.length === 0 ? (
            <CarouselItem>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <Image
                    alt="scam"
                    height={500}
                    src="/placeholder.png"
                    width={500}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ) : (
            images.map(image => (
              <CarouselItem key={image.id}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center">
                    <Image
                      alt="scam"
                      height={500}
                      src={`https://d8f7wymmosp6f.cloudfront.net/${image.url}`}
                      width={500}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))

          )}

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

type DetailProps = {
  scam: Scam,
  refetch: () => void
}

const Details = ({ scam, refetch }: DetailProps) => {
  dayjs.extend(relativeTime)

  const voteMutation = useMutation({
    mutationFn: (action: 'upvote' | 'downvote') => voteScam({ id: scam.id, action: action }),
  })

  const time = dayjs(scam.createdAt).fromNow()

  const vote = async (action: 'upvote' | 'downvote') => {
    voteMutation
      .mutateAsync(action)
      .then(() => {
        refetch()
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <Card>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle>{scam.name}</CardTitle>
        <div className='flex gap-4'>
          <div className='flex flex-col items-center justify-center gap-1 text-white hover:text-green-500'>
            <button
              onClick={() => {
                vote('upvote')
              }}>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <div className='flex flex-col items-center justify-center gap-1 text-white hover:text-red-500'>
            <button
              onClick={() => {
                vote('downvote')
              }}>
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <Label>Desription</Label>
          <div className='text-sm text-gray-200 break-words max-w-80 pt-2'>
            {scam.description}
          </div>
        </div>

        <div>
          <Label>Tags</Label>
          <div className="grid grid-cols-5 items-center gap-2 pt-2">
            {scam.scamToTags.map(tag => (
              <div key={tag.tagId} className='rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 max-width-32 truncate items-start justify-start hover:text-clip'>{transformFormat(tag.tagId)}</div>
            ))}
          </div>
        </div>

        {scam.platform ? (
          <div>
            <Label>Scammer Info</Label>
            <div className='pt-2 text-sm'>
              This scam is on <span className='underline uppercase'>{scam.platform}</span> {platformWriting(scam.platform)} <span className='text-gray-400'>{scam.scammerInfo}</span>
            </div>
          </div>
        ) : null}

        <div className='text-xs pt-4 text-gray-400'>
          {scam.upvotes} Upvote {scam.downvotes} Downvote
        </div>
      </CardContent>
      <CardFooter className='text-xs text-gray-300'>
        <p> Uploaded by <span className='text-gray-400'>Anon</span> {time}</p>
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

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Input placeholder="Nickname" />
          <Textarea placeholder='Put a comment' />
          <button className='flex justify-end text-end pr-1'>
            <SendHorizonalIcon className="h-4 w-4 text-white hover:text-gray-500" />
          </button>
        </CardContent>
      </Card>
      {comments.length === 0 ? <div className='text-center pt-4'>No comments yet</div> : (
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
      )}
    </div>
  )
}

export default function Scam({ params }: { params: { id: string } }) {
  const router = useRouter();

  const scam = useQuery({
    queryKey: ['scam', params.id],
    queryFn: () => getScam(params.id),
  })

  console.log(scam)

  if (scam.isPending) {
    return <div>Loading...</div>
  }

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
          <Details scam={scam.data as Scam} refetch={scam.refetch} />
        </div>
        <div className='pt-4'>
          <CommentSection comments={scam.data?.comments as Comments[]} />
        </div>
      </div>
    </div>
  );
};
