'use client';

import { CircleIcon, DiscordLogoIcon, GitHubLogoIcon, PlusCircledIcon } from '@radix-ui/react-icons';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { bungee } from '../fonts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import UploadForm from '@/components/ui/upload-form';

function ScamCard() {
  return (
    <Card>
      <CardHeader className="grid items-start gap-4 space-y-0">
        <div className="space-y-1">
          <div className="flex max-h-64 justify-center">
            <Image
              alt="example1"
              className="h-auto w-auto rounded-xl object-cover transition-all hover:scale-105"
              height={150}
              src="/examplescam2.jpg"
              width={200}
            />
          </div>
          <CardTitle className="max-w-24 truncate pt-4 hover:text-clip">
            ScamScamScamScamScamScamScamScamScamScamScamScamScam
          </CardTitle>
          <CardDescription>Ini scam yang mudah</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-red-400 text-red-400" />
            APK
          </div>
          <div className="text-sm">Uploaded on April 2023</div>
        </div>
      </CardContent>
    </Card>
  );
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: 'Description must be at least 1 characters.',
  }),
  scamName: z.string().min(1, {
    message: 'Scam name must be at least 1 characters.',
  }),
});

function AddScamForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      description: '',
      scamName: '',
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add scam</DialogTitle>
        <DialogDescription>
          Help us to create awareness to Malaysian people about online scam. Or any other type of scams
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="scamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scam name</FormLabel>
                <FormControl>
                  <Input placeholder="Online scam..." {...field} />
                </FormControl>
                <FormDescription>Name of the scam eg: &quot;APK scam, Online scam&quot;.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" placeholder="This scam is related to..." {...field} />
                </FormControl>
                <FormDescription>Explain a little bit about the scam.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="">
            <FormLabel>Picture</FormLabel>
            <UploadForm />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default function Browse() {
  const [, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <div className="sticky top-0 flex w-full justify-between p-4">
        <div className="flex flex-row items-center justify-center">
          <button className={`pr-4 md:text-2xl ${bungee.className}`}>Kena Scam</button>
          <GitHubLogoIcon className="mr-4 h-6 w-6" />
          <DiscordLogoIcon className="h-6 w-6" />
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircledIcon className="mr-2" />
                Scam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AddScamForm />
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
