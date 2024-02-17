'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CreateScamSchema } from '@/zod/schemas/scamForm';
import { createScamSchema } from '@/zod/schemas/scamForm';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadForm from '@/components/ui/upload-form';
import { Button } from '@/components/ui/button';
// import type { Option } from '@/components/ui/multiple-selector';
import MultipleSelector from '@/components/ui/multiple-selector';
import { createScam, getTags } from '@/service/scam';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { sanitizeObject } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OPTIONS = [
  { label: 'Phishing', value: 'phishing' },
  { label: 'Social Media', value: 'social-media' },
  { label: 'Online Shopping', value: 'online-shopping' },
  { label: 'Financial', value: 'financial' },
  { label: 'Impersonation', value: 'impersonation' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Whatsapp', value: 'whatsapp' },
  { label: 'APK', value: 'apk' },
  { label: 'Shitcoin', value: 'shitcoin' },
  { label: 'Investment', value: 'investment' },
  { label: 'Crypto', value: 'crypto' },
  { label: 'Saham', value: 'saham' },
  { label: 'Car', value: 'car' },
  { label: 'Religion', value: 'religion' },
  { label: 'Catfish', value: 'catfish' },
  { label: 'Love', value: 'love' },
  { label: 'Royalty', value: 'royalty' },
  { label: 'Porn', value: 'porn' },
  { label: 'Spam', value: 'spam' },
  { label: 'Deepfake', value: 'deepfake' },
  { label: 'Pharming', value: 'pharming' },
  { label: 'Job Offer', value: 'job-offer' },
  { label: 'Mule Account', value: 'mule-account' },
  { label: 'Casino', value: 'casino' },
  { label: 'Gamble', value: 'gamble' },
  { label: 'Bitcoin', value: 'bitcoin' },
  { label: 'Congratulations', value: 'congratulations' },
  { label: 'Advance Fee', value: 'advance-fee' },
  { label: 'Smartphone', value: 'smartphone' },
  { label: 'False  Tech Support', value: 'false-tech-support' },
  { label: 'Property Rental', value: 'property-rental' },
  { label: 'Smartphone', value: 'smartphone' },
  { label: 'Local Authorities', value: 'local-authorities' },
  { label: 'Parcel', value: 'parcel' },
  { label: 'Charity Fraud', value: 'charity-fraud' },
  { label: 'Lottery', value: 'lottery' },
  { label: 'Tech Support', value: 'tech-support' },
  { label: 'Ransomware', value: 'ransomware' },
  { label: 'Email Spoofing', value: 'email-spoofing' },
  { label: 'Identity Theft', value: 'identity-theft' },
  { label: 'Fake Antivirus', value: 'fake-antivirus' },
  { label: 'Ponzi Scheme', value: 'ponzi-scheme' },
  { label: 'Pyramid Scheme', value: 'pyramid-scheme' },
  { label: 'Healthcare Fraud', value: 'healthcare-fraud' },
  { label: 'Insurance Fraud', value: 'insurance-fraud' },
  { label: 'Tax', value: 'tax' },
  { label: 'Real Estate', value: 'real-estate' },
  { label: 'Fake Scholarships', value: 'fake-scholarships' },
  { label: 'Crowdfunding Fraud', value: 'crowdfunding-fraud' },
  { label: 'Data Breach', value: 'data-breach' },
  { label: 'Subscription', value: 'subscription' },
  { label: 'Romance', value: 'romance' },
  { label: 'Fake Shopping Websites', value: 'fake-shopping-websites' },
  { label: 'Counterfeit Products', value: 'counterfeit-products' },
  { label: 'Malware', value: 'malware' },
  { label: 'Gift Card', value: 'gift-card' },
  { label: 'Travel', value: 'travel' },
  { label: 'NFT', value: 'nft' },
  { label: 'Bank Loan', value: 'bank-loan' },
  { label: 'Quantum Metal', value: 'quantum-metal' },
  { label: 'Fake Event Tickets', value: 'fake-event-tickets' },
  { label: 'Health', value: 'health' },
  { label: 'Fake News', value: 'fake-news' },
  { label: 'Online Dating', value: 'online-dating' },
  { label: 'Credit Card Fraud', value: 'credit-card-fraud' },
  { label: 'Tech Gadget', value: 'tech-gadget' },
  { label: 'Fake Software', value: 'fake-software' },
  { label: 'Online Auctions', value: 'online-auctions' },
  { label: 'Job Opportunities', value: 'job-opportunities' },
  { label: 'Home Repair', value: 'home-repair' },
  { label: 'Pet', value: 'pet' },
  { label: 'Elderly Exploitation', value: 'elderly-exploitation' },
  { label: 'Home Rentals', value: 'home-rentals' },
  { label: 'Fake Degrees', value: 'fake-degrees' },
  { label: 'Online Extortion', value: 'online-extortion' },
  { label: 'Quid Pro Quo', value: 'quid-pro-quo' },
  { label: 'Charity', value: 'charity' },
  { label: 'Gold', value: 'gold' },
  { label: 'Vehicle', value: 'vehicle' },
  { label: 'Employment', value: 'employment'}
];

type AddScamFormProps = {
  fileKey: string[];
  setFileKey: (key: string[]) => void;
  setCreateScamSuccess: (val: boolean) => void;
};

function ScamSourceInput({ platform, setScammerInfo }: { platform: string; setScammerInfo: (val: string) => void }) {
  switch (platform) {
    case 'facebook':
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="Facebook">Scammer FB profile or page URL</Label>
          <Input
            type="text"
            id="facebook"
            placeholder="https://www.facebook.com/scammer-name"
            onChange={e => {
              setScammerInfo(e.target.value);
            }}
          />
        </div>
      );
    case 'whatsapp':
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="Whatsapp">Scammer Whatsapp number</Label>
          <Input
            type="Whatsapp"
            id="Whatsapp"
            placeholder="eg: 0123456789"
            onChange={e => {
              setScammerInfo(e.target.value);
            }}
          />
        </div>
      );
    case 'x':
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="X">Scammer X account</Label>
          <Input
            type="X"
            id="X"
            placeholder="https://x.com/scammer-name"
            onChange={e => {
              setScammerInfo(e.target.value);
            }}
          />
        </div>
      );
    case 'telegram':
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="telegram">Scammer Telegram username</Label>
          <Input
            type="telegram"
            id="telegram"
            placeholder="@scammer-name"
            onChange={e => {
              setScammerInfo(e.target.value);
            }}
          />
        </div>
      );
    case 'phone-call':
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="phone-call">Scammer phone number</Label>
          <Input
            type="phone-call"
            id="phone-call"
            placeholder="eg: 0123456789"
            onChange={e => {
              setScammerInfo(e.target.value);
            }}
          />
        </div>
      );
    case 'email':
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Scammer email</Label>
          <Input
            type="email"
            id="email"
            placeholder="scammer-email@scammer.com"
            onChange={e => {
              setScammerInfo(e.target.value);
            }}
          />
        </div>
      );
    case 'other':
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="other">Other link</Label>
          <Input
            type="other"
            id="other"
            placeholder="Enter other source"
            onChange={e => {
              setScammerInfo(e.target.value);
            }}
          />
        </div>
      );
    default:
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="Facebook">Scammer FB profile or page URL</Label>
          <Input
            type="text"
            id="facebook"
            placeholder="https://www.facebook.com/scammer-name"
            onChange={e => {
              setScammerInfo(e.target.value);
            }}
          />
        </div>
      );
  }
}

export default function AddScamForm({ fileKey, setFileKey, setCreateScamSuccess }: AddScamFormProps) {
  const [openScamPlatform, setOpenScamPlatform] = useState(false);
  const [scamSource, setScamSource] = useState('');
  const [scammerInfo, setScammerInfo] = useState('');

  const router = useRouter();

  const createScamMutation = useMutation({
    mutationFn: createScam,
    mutationKey: ['createScam'],
  });

  const categories = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });

  const form = useForm<CreateScamSchema>({
    defaultValues: {
      description: '',
      tags: [],
      name: '',
    },
    resolver: zodResolver(createScamSchema),
  });

  // eslint-disable-next-line consistent-return
  async function onSubmit(values: CreateScamSchema) {

    const filtered = sanitizeObject({
      description: values.description,
      name: values.name,
    });

    if (/^\s*$/.test(filtered.description as string) || /^\s*$/.test(filtered.name as string)) {
      return window.open('https://www.youtube.com/watch?v=QJVuFqXxLo4');
    }

    createScamMutation
      .mutateAsync({
        tags: values.tags,
        description: filtered.description as string,
        fileKey: fileKey,
        name: filtered.name as string,
        platform: scamSource,
        scammerInfo,
      })
      .then(res => {
        if (res.status === 201) {
          setCreateScamSuccess(true);
          
          toast('Scam added!', {
            description: 'Scam has been added successfully, please wait for admin approval',
          });

          router.push('/');

          return;
        }
      })
      .catch(err => {
        console.log(err);
        toast('Something went wrong', {
          description: 'Please be patient and wait for a moment',
        });
      });
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scam name</FormLabel>
                <FormControl>
                  <Input placeholder="Pak man telo" {...field} />
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
                  <Textarea className="resize-none" placeholder="Scam yang sangat teruk" {...field} />
                </FormControl>
                <FormDescription>Explain a little bit about the scam.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="scam-platform"
              checked={openScamPlatform}
              onCheckedChange={() => setOpenScamPlatform(!openScamPlatform)}
            />
            <label
              htmlFor="scam-platform"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              This scam is being done at a platform
            </label>
          </div>

          {openScamPlatform ? (
            <>
              <div className="py-2">
                <RadioGroup
                  defaultValue="facebook"
                  onValueChange={val => {
                    setScamSource(val);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="facebook" id="facebook" />

                    <Label htmlFor="facebook">Facebook</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whatsapp" id="whatsapp" />

                    <Label htmlFor="whatsapp">Whatsapp</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="x" id="x" />

                    <Label htmlFor="x">X</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="telegram" id="telegram" />

                    <Label htmlFor="telegram">Telegram</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone-call" id="phone-call" />

                    <Label htmlFor="phone-call">Phone call</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />

                    <Label htmlFor="email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />

                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <ScamSourceInput platform={scamSource} setScammerInfo={setScammerInfo} />
            </>
          ) : (
            ''
          )}

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  {categories.isPending ? (
                    <p>Fetching Tags...</p>
                  ) : (
                    <MultipleSelector
                      defaultOptions={categories.data}
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                      onChange={field.onChange}
                      placeholder="Tag this scam"
                      value={field.value}
                    />
                  )}
                </FormControl>
                <FormMessage />
                <FormDescription>
                  <Dialog>
                    <DialogTrigger className="text-xs italic">
                      Tag not available? <span className="underline">Suggest tag</span>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>Tag suggestion (Coming soon!)</DialogHeader>
                      <Input></Input>
                      <DialogFooter>
                        <Button>Suggest</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="">
            <FormLabel>Upload some picture</FormLabel>
            <UploadForm fileKey={fileKey} setFileKey={setFileKey} />
          </div>

          <Button type="submit" disabled={createScamMutation.isPending}>
            {createScamMutation.isPending ? 'Loading' : 'Submit'}
          </Button>
        </form>
      </Form>
    </>
  );
}
