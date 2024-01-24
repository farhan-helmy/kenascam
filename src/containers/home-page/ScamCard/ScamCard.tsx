import Image from 'next/image';
import { CircleIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ScamCard() {
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
