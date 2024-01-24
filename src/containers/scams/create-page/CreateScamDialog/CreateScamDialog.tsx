'use client';

import { useRouter } from 'next/navigation';
import CreateScamForm from '../CreateScamForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CreateScamDialog() {
  const router = useRouter();

  function handleOpenChange(open: boolean) {
    if (!open) {
      router.back();
    }
  }

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add scam</DialogTitle>
          <DialogDescription>
            Help us to create awareness to Malaysian people about online scam. Or any other type of scams
          </DialogDescription>
        </DialogHeader>
        <CreateScamForm />
      </DialogContent>
    </Dialog>
  );
}
