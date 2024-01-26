'use client';

import { DiscordLogoIcon, GitHubLogoIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { bungee } from '../fonts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ScamCard from './ScamCard';
import AddScamForm from './AddScamForm';
import { DeleteFile } from '@/lib/server/s3';

export default function Browse() {
  const [, setLoading] = useState(false);

  const [fileKey, setFileKey] = useState<string[]>([])

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const cleanUpImages = async () => {
    console.log("cleaning up images")
    for (const key of fileKey) {
      const res = await DeleteFile(key);
      if (res.success) {
        setFileKey([]);
      }
    }
  }
  return (
    <>
      <div className="sticky top-0 flex w-full justify-between p-4">
        <div className="flex flex-row items-center justify-center">
          <button className={`pr-4 md:text-2xl ${bungee.className}`}>Kena Scam</button>
          <GitHubLogoIcon className="mr-4 h-6 w-6" />
          <DiscordLogoIcon className="h-6 w-6" />
        </div>
        <div>
          <Dialog onOpenChange={() => cleanUpImages()}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircledIcon className="mr-2" />
                Scam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AddScamForm fileKey={fileKey} setFileKey={setFileKey} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center justify-center px-8 pt-4 sm:px-12 md:px-24 xl:px-52">
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/scam/123" passHref>
            <ScamCard />
          </Link>
          <ScamCard />
          <ScamCard />
          <ScamCard />
          <ScamCard />
          <ScamCard />
          <ScamCard />
        </div>
      </div>
    </>
  );
}
