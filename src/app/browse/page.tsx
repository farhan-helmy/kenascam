'use client';

import { DiscordLogoIcon, GitHubLogoIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { bungee } from '../fonts';
import AddScamForm from './AddScamForm';
import ScamCardSkeleton from './skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DeleteFile } from '@/lib/server/s3';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getScams } from '@/service/scam';
import { Badge } from '@/components/ui/badge';

type ScamCardProps = {
  name: string;
  description: string;
  platform?: string;
  scammerInfo?: string;
  fileKey: string[];
  tags: string[];
  createdAt: string;
}

export function transformFormat(input: string): string {
  if (input.includes('-')) {
    const words = input.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ').toUpperCase();
  } else {
    return input.toUpperCase();
  }
}

function ScamCard({ name, description, createdAt, tags, fileKey }: ScamCardProps) {
  return (
    <Card className="group relative">
      <CardHeader className="grid items-start gap-4 space-y-0">
        <div className="space-y-1">
          <div className="flex max-h-64 h-64 justify-center">
            <Image
              alt="example1"
              className="h-auto w-auto rounded-xl object-cover transition-all hover:scale-105"
              height={150}
              src={fileKey[0] ? `https://d8f7wymmosp6f.cloudfront.net/${fileKey[0]}` : '/placeholder.png'}
              width={200}
            />
          </div>
          <CardTitle className="max-w-24 truncate pt-4 hover:text-clip">
            {name}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground relative overflow-hidden">
          <div className="flex items-center">
            <Badge className='text-xs'>
              {transformFormat(tags[0])}
            </Badge>
            {(tags.length - 1 !== 0) ?
              (
                <div className='text-xs font-bold text-white px-2'>
                  + {tags.length - 1} more
                </div>
              )
              : null
            }
          </div>
          <div className="transition-transform group-hover:translate-y-6 text-xs text-white font-light">
            Uploaded on {createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown'}
          </div>
          <div className="text-blue-500 absolute right-0 -bottom-6 transition-transform group-hover:-translate-y-6 group-hover:duration-300">
            Click to explore
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



export default function Browse() {
  const [, setLoading] = useState(false);

  const [fileKey, setFileKey] = useState<string[]>([])
  const [createScamSuccess, setCreateScamSuccess] = useState(false)

  const skeletonCards = new Array(12).fill(null);


  const scams = useQuery({
    queryKey: ['scams'],
    queryFn: () => getScams(),
  })

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const cleanUpImages = async () => {
    if (createScamSuccess) return

    if (fileKey.length === 0) return

    console.log('---cleaning up images---')

    for (const key of fileKey) {
      const res = await DeleteFile(key);
      if (res.success) {
        setFileKey([]);
        setCreateScamSuccess(false);
      }
    }
  }
  return (
    <>
      <div className="sticky top-0 flex w-full justify-between p-4">
        <div className="flex flex-row items-center justify-center">
          <button className={`pr-4 md:text-2xl ${bungee.className}`}>Kena Scam</button>
          <Link href="https://github.com/farhan-helmy/kenascam">
            <GitHubLogoIcon className="mr-4 h-6 w-6" />
          </Link>
          <DiscordLogoIcon className="h-6 w-6" />
        </div>
        <div className='max-h-screen'>
          <Dialog onOpenChange={() => cleanUpImages()}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircledIcon className="mr-2" />
                Scam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] overflow-auto max-h-screen">
              <AddScamForm fileKey={fileKey} setFileKey={setFileKey} setCreateScamSuccess={setCreateScamSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center justify-center px-8 pt-4 sm:px-12 md:px-24 xl:px-52">
        <div className="grid gap-4 md:grid-cols-3">
          {scams.isLoading ? (
            skeletonCards.map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <ScamCardSkeleton key={index} />
            ))
          ) : (
            scams.data?.map(scam => (
              <Link key={scam.id} href={`/scam/${scam.id}`} scroll>
                <ScamCard
                  key={scam.id}
                  name={scam.name}
                  description={scam.description}
                  createdAt={scam.createdAt}
                  tags={scam.scamToTags.map(tag => tag.tagId)}
                  fileKey={scam.images.map(image => image.url)}
                />
              </Link>
            ))
          )}

        </div>
      </div>
    </>
  );
}