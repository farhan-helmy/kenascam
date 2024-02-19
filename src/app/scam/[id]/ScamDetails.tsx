'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowDown, ArrowUp, SendHorizonalIcon, X } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Comments, Scam, Image as ImageType } from '@/service/scam';
import { commentScam, getScam, voteScam } from '@/service/scam';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { sanitizeObject, transformFormat } from '@/lib/utils';

export const metadata: Metadata = {
  description: 'Malaysia number 1 scam directory',
  title: 'KenaScam',
};

const platformWriting = (platform: string) => {
  switch (platform) {
    case 'facebook':
      return "Here is the scammer's Facebook profile or page URL";
    case 'whatsapp':
      return "Here is the scammer's WhatsApp number";
    case 'x':
      return "Here is the scammer's X username";
    case 'telegram':
      return "Here is the scammer's Telegram username";
    case 'phone-call':
      return "Here is the scammer's phone number";
    case 'email':
      return "Here is the scammer's email";
    case 'other':
      return "Here is the scammer's other contact info";
    default:
      return "Here is the scammer's contact info";
  }
};

type ImageGalleryProps = {
  images: ImageType[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="px-12 pt-6 md:h-screen lg:h-screen xl:h-screen">
      <Carousel className="w-full md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px]">
        <CarouselContent>
          {images.length === 0 ? (
            <CarouselItem>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <Image alt="scam" height={500} src="/placeholder.png" width={500} />
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
  );
};

type DetailProps = {
  scam: Scam;
  refetch: () => void;
};

const Details = ({ scam, refetch }: DetailProps) => {
  dayjs.extend(relativeTime);

  const voteMutation = useMutation({
    mutationFn: (action: 'upvote' | 'downvote') => voteScam({ id: scam.id, action: action }),
  });

  const time = dayjs(scam.createdAt).fromNow();

  const vote = async (action: 'upvote' | 'downvote') => {
    voteMutation
      .mutateAsync(action)
      .then(() => {
        refetch();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      <Script async src="https://platform.twitter.com/widgets.js"></Script>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{scam.name}</CardTitle>
          <div className="flex gap-4">
            <div className="flex flex-row items-center justify-center gap-1 text-white hover:text-green-500">
              <button
                onClick={() => {
                  vote('upvote');
                }}
                className="flex flex-row items-center justify-center gap-1"
              >
                <ArrowUp className="h-4 w-4" />
                <div className="text-xs font-light text-green-500"> {scam.upvotes} Upvotes </div>
              </button>
            </div>
            <div className="flex flex-row items-center justify-center gap-1 text-white hover:text-red-500">
              <button
                onClick={() => {
                  vote('downvote');
                }}
                className="flex flex-row items-center justify-center gap-1"
              >
                <ArrowDown className="h-4 w-4" />
                <div className="text-xs font-light text-red-500"> {scam.downvotes} Downvotes </div>
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label>Desription</Label>
            <div className="max-w-80 break-words pt-2 text-sm text-gray-200">{scam.description}</div>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex flex-row flex-wrap items-center gap-2 pt-2">
              {scam.scamToTags.map(tag => (
                <div
                  key={tag.tagId}
                  className="max-width-32 items-start justify-start truncate rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:text-clip focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {transformFormat(tag.tagId)}
                </div>
              ))}
            </div>
          </div>

          {scam.platform ? (
            <div>
              <Label>Scammer Info</Label>
              <div className="pt-2 text-sm">
                This scam is on <span className="uppercase underline">{scam.platform}</span>{' '}
                {platformWriting(scam.platform)} <span className="text-gray-400">{scam.scammerInfo}</span>
              </div>
            </div>
          ) : null}
        </CardContent>
        <CardFooter>
          <div className="flex flex-col">
            <div className="text-xs text-gray-300">
              {' '}
              Uploaded by <span className="text-gray-400">Anon</span> {time}
            </div>
            <div className="pt-4">
              <Link
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                className="twitter-share-button"
                data-show-count="false"
              >
                X
              </Link>
              <script></script>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

type CommenSectionProps = {
  comments: Comments[];
  loading?: boolean;
  scamID: string;
  refetch: () => void;
};

const CommentSection = ({ comments, loading, scamID, refetch }: CommenSectionProps) => {
  dayjs.extend(relativeTime);

  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');

  const commentMutation = useMutation({
    mutationFn: ({}: { nicknamemut: string; contentmut: string; scamIDmut: string }) =>
      commentScam({
        nickname,
        content,
        scamID,
      }),
  });

  if (loading) {
    return <div>fetching comments...</div>;
  }

  // eslint-disable-next-line consistent-return
  const addComment = async () => {
    const filtered = sanitizeObject({
      nickname,
      content,
    });

    if (/^\s*$/.test(filtered.content as string) || /^\s*$/.test(filtered.nickname as string)) {
      return window.open('https://www.youtube.com/watch?v=QJVuFqXxLo4');
    }

    commentMutation
      .mutateAsync({
        nicknamemut: filtered.nickname as string,
        contentmut: filtered.content as string,
        scamIDmut: scamID,
      })
      .then(res => {
        console.log('commentRes', res);
        // clear comment list before refetch
        setNickname('');
        setContent('');

        refetch();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Input placeholder="Nickname" onChange={e => setNickname(e.target.value)} value={nickname} />
          <Textarea placeholder="Comment something" onChange={e => setContent(e.target.value)} value={content} />
          <button className="flex justify-end pr-1 text-end" onClick={() => addComment()}>
            <SendHorizonalIcon className="h-4 w-4 text-white hover:text-gray-500" />
          </button>
        </CardContent>
      </Card>
      {comments.length === 0 ? (
        <div className="pt-4 text-center">No comments yet</div>
      ) : (
        <div className="flex h-[440px] flex-col gap-2 overflow-auto px-4 pt-8">
          {comments.map(comment => (
            <div className="flex flex-row gap-2" key={comment.id}>
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${comment.nickname}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="max-w h-full w-full max-w-80 text-wrap rounded-md bg-gray-700 p-2 text-xs md:max-w-64 lg:max-w-64 xl:max-w-96">
                <div>
                  <span className="pr-2 font-bold">{comment.nickname}</span>
                  <span className="text-gray-400">{dayjs(comment.createdAt).fromNow()}</span>
                </div>
                <p className="break-words pt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ScamDetails({ id }: { id: string }) {
  const router = useRouter();

  const scam = useQuery({
    queryKey: ['scam', id],
    queryFn: () => getScam(id),
  });

  if (scam.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-3">
      <button className="absolute left-1 top-1">
        <X className="h-6 w-6 text-white hover:text-gray-500" onClick={() => router.back()} />
      </button>
      <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
        <ImageGallery images={scam.data?.images as ImageType[]} />
      </div>
      <div className="flex flex-col p-4">
        <div className="w-full rounded-md">
          <Details scam={scam.data as Scam} refetch={scam.refetch} />
        </div>
        <div className="pt-4">
          <CommentSection comments={scam.data?.comments as Comments[]} scamID={id} refetch={scam.refetch} />
        </div>
      </div>
    </div>
  );
}
