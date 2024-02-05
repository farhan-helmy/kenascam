import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { CreateScamSchema } from '@/zod/schemas/scamForm';
import { createScamSchema } from '@/zod/schemas/scamForm';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, Dialog, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadForm from '@/components/ui/upload-form';
import { Button } from '@/components/ui/button';
// import type { Option } from '@/components/ui/multiple-selector';
import MultipleSelector from '@/components/ui/multiple-selector';
import { createScam, getCategories } from '@/service/scam';


const OPTIONS: Option[] = [
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
  { label: 'Religion', value:'religion'},
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
  { label: 'Smartphone', value: 'smartphone' },
  { label: 'False  Tech Support', value :'false-tech-support'},
  { label: 'Property Rental', value :'property-rental'},
  { label: 'Smartphone', value: 'smartphone' },
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
  { label: 'Gold', value: 'gold' }
];

type AddScamFormProps = {
  fileKey: string[]
  setFileKey: (key: string[]) => void
};

export default function AddScamForm({ fileKey, setFileKey }: AddScamFormProps) {

  const createScamMutation = useMutation({
    mutationFn: createScam,
    mutationKey: ['createScam'],
  })

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  const form = useForm<CreateScamSchema>({
    defaultValues: {
      description: '',
      categories: [],
      name: ''
    },
    resolver: zodResolver(createScamSchema),
  });

  async function onSubmit(values: CreateScamSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('fileKey', fileKey)
    console.log(values);

    createScamMutation.mutateAsync({
      categories: values.categories,
      description: values.description,
      fileKey: fileKey,
      name: values.name
    })
      .then(res => {
        console.log(res)
        toast('Scam added!', {
          description: 'Scam has been added successfully, please wait for admin approval',
        })
      })
      .catch(err => {
        console.log(err)
        toast('Something went wrong', {
          description: 'Please be patient and wait for a moment',
        })
      })
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

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  {categories.isPending ? <p>Fetching categories...</p> : (
                    <MultipleSelector
                      defaultOptions={categories.data}
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                      onChange={field.onChange}
                      placeholder="Add categories"
                      value={field.value}
                    />
                  )}

                </FormControl>
                <FormMessage />
                <FormDescription>
                  <Dialog>
                    <DialogTrigger className='text-xs italic'>
                      Category not available? <span className='underline'>Suggest category</span>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        Category suggestion
                      </DialogHeader>
                      <Input>
                      </Input>
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
