'use client';

import { GitHubLogoIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Heart } from 'lucide-react';
import { bungee } from '../fonts';
import AddScamForm from './AddScamForm';
import ScamCardSkeleton from './skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DeleteFile } from '@/lib/server/s3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getScams } from '@/service/scam';
import { transformFormat } from '@/lib/utils';

type ScamCardProps = {
  name: string;
  description: string;
  platform?: string;
  scammerInfo?: string;
  fileKey: string[];
  tags: string[];
  createdAt: string;
};

function ScamCard({ name, description, createdAt, tags, fileKey }: ScamCardProps) {
  return (
    <Card className="group relative">
      <CardHeader className="grid items-start gap-4 space-y-0">
        <div className="space-y-1">
          <div className="flex h-64 max-h-64 justify-center">
            <Image
              alt="example1"
              className="h-auto w-auto rounded-xl object-cover transition-all hover:scale-105"
              height={150}
              src={fileKey[0] ? `https://d8f7wymmosp6f.cloudfront.net/${fileKey[0]}` : '/placeholder.png'}
              width={200}
            />
          </div>
          <CardTitle className="max-w-72 truncate pt-4 hover:text-clip">{name}</CardTitle>
          <CardDescription className="xl:max-w-48 md:max-w-48 sm:max-w-32 max-w-96 truncate pt-4 hover:text-clip">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground relative flex flex-col gap-y-4 overflow-hidden text-sm">
          <div className="flex items-center">
            <div className="focus:ring-ring max-width-24 items-start justify-start truncate rounded-md border bg-white px-2.5 py-0.5 text-xs font-semibold text-black transition-colors hover:text-clip focus:outline-none focus:ring-2 focus:ring-offset-2">
              {transformFormat(tags[0])}
            </div>
            {tags.length - 1 !== 0 ? (
              <div className="px-2 text-xs font-bold text-white">+ {tags.length - 1} more</div>
            ) : null}
          </div>

          <div className="text-xs font-light text-white transition-transform group-hover:translate-y-6">
            Uploaded {createdAt}
          </div>
          <div className="absolute -bottom-6 right-0 text-blue-500 transition-transform group-hover:-translate-y-6 group-hover:duration-300">
            Click to explore
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Browse() {
  dayjs.extend(relativeTime);

  const [fileKey, setFileKey] = useState<string[]>([]);
  const [createScamSuccess, setCreateScamSuccess] = useState(false);

  const skeletonCards = new Array(12).fill(null);

  const scams = useQuery({
    queryKey: ['scams'],
    queryFn: () => getScams(),
  });

  const cleanUpImages = async () => {
    if (createScamSuccess) return;

    if (fileKey.length === 0) return;

    console.log('---cleaning up images---');

    for (const key of fileKey) {
      const res = await DeleteFile(key);
      if (res.success) {
        setFileKey([]);
        setCreateScamSuccess(false);
      }
    }
  };
  return (
    <>
      <div className="sticky top-0 flex w-full justify-between p-4">
        <div className="flex flex-row items-center justify-center">
          <button className={`pr-4 md:text-2xl ${bungee.className}`}>Kena Scam</button>
          <Link href="https://github.com/farhan-helmy/kenascam">
            <GitHubLogoIcon className="mr-4 h-6 w-6" />
          </Link>
          <Link href="https://github.com/sponsors/farhan-helmy">
            <div className='flex flex-row gap-2 border-2 rounded-md p-1 items-center justify-center'>
              <Heart className="h-4 w-4 text-red-400" />
              <div className='text-sm'>
                Sponsor
              </div>
            </div>
          </Link>
        </div>
        <div className="max-h-screen">
          <Dialog onOpenChange={() => cleanUpImages()}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircledIcon className="mr-2" />
                Scam
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-auto sm:max-w-[500px]">
              <AddScamForm fileKey={fileKey} setFileKey={setFileKey} setCreateScamSuccess={setCreateScamSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center justify-center px-8 pt-4 sm:px-12 md:px-24 xl:px-52">
        <div className="grid gap-4 md:grid-cols-3">
          {scams.isLoading
            ? skeletonCards.map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <ScamCardSkeleton key={index} />
            ))
            : scams.data?.map(scam => (
              <Link key={scam.id} href={`/scam/${scam.id}`} scroll>
                <ScamCard
                  key={scam.id}
                  name={scam.name}
                  description={scam.description}
                  createdAt={dayjs(scam.createdAt).fromNow()}
                  tags={scam.scamToTags.map(tag => tag.tagId)}
                  fileKey={scam.images.map(image => image.url)}
                />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
