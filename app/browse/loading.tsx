import { Skeleton } from '@/components/ui/skeleton';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoadingSkeleton() {
  return (
    <Card>
      <CardHeader className="grid items-start gap-4 space-y-0">
        <div className="space-y-1">
          <div className="flex justify-center">
            <Skeleton className="h-24 w-24 object-cover transition-all hover:scale-105" />
          </div>
          <CardTitle className="max-w-24">
            <Skeleton className="h-4 w-[200px]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-[200px]" />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="text-sm">
            <Skeleton className="h-4 w-[50px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
