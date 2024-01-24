'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ScamModal = () => {
  const router = useRouter();

  return (
    <Dialog onOpenChange={() => router.back()} open={true}>
      <DialogContent>
        <Card className="border-none">
          <CardHeader>
            <div className="flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div>
                      <ArrowUp className="h-6 w-6 hover:text-green-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs italic">Upvote</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div>
                      <ArrowDown className="h-6 w-6 hover:text-red-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs italic">Downvote</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 space-y-0">
            <div className="flex max-h-64 justify-center">
              <Dialog>
                <DialogTrigger>
                  <div>
                    <Image
                      alt="example1"
                      className="h-auto w-auto rounded-xl object-cover transition-all hover:scale-105"
                      height={100}
                      src="/examplescam2.jpg"
                      width={150}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <Image
                    alt="example1"
                    className="h-auto w-auto object-cover transition-all"
                    height={500}
                    src="/examplescam2.jpg"
                    width={500}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <CardTitle className="max-w-24 truncate hover:text-clip">Scam APK</CardTitle>
              <CardDescription className="max-h-24 overflow-auto pt-4">
                INI scam yang terbaikINI scam yang terbaikINI scam yang terbaikINI scam yang terbaikINI scam yang
                terbaikINI scam yang terbaik
              </CardDescription>
              <div className="flex flex-col pt-4">
                <Label>Categories</Label>
                <div className="grid grid-cols-4 justify-center gap-2 pt-2">
                  <Badge variant="outline">APK</Badge>
                  <Badge variant="destructive">APK</Badge>
                  <Badge variant="secondary">APK</Badge>
                  <Badge>APK</Badge>
                  <Badge>APK</Badge>
                </div>
              </div>
            </div>
            <CardFooter></CardFooter>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ScamModal;
