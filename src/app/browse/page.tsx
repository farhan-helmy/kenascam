'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ScamCard from './ScamCard';
import Header from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import AddScamForm from './AddScamForm';
import { DeleteFile } from '@/lib/server/s3';

export default function Browse() {
  const [, setLoading] = useState(false);
  const [fileKey, setFileKey] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const cleanUpImages = async () => {
    console.log('cleaning up images');
    for (const key of fileKey) {
      const res = await DeleteFile(key);
      if (res.success) {
        setFileKey([]);
      }
    }
  };

  return (
    <>
      <Header>
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
      </Header>
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
