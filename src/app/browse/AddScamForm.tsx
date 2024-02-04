import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { CreateScamSchema } from '@/zod/schemas/scamForm';
import { createScamSchema } from '@/zod/schemas/scamForm';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, Dialog, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadForm from '@/components/ui/upload-form';
import { Button } from '@/components/ui/button';
import type { Option } from '@/components/ui/multiple-selector';
import MultipleSelector from '@/components/ui/multiple-selector';
import { createScam } from '@/service/scam';


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
  { label: 'Catfish', value: 'catfish' },
  { label: 'Love', value: 'love' },
  { label: 'Royalty', value: 'royalty' },
  { label: 'Porn', value: 'porn' },
  { label: 'Job', value: 'job' },
  { label: 'Email', value: 'email' },
  { label: 'Tech Support', value: 'tech-support' },
  { label: 'Lottery or Prize', value: 'lottery' },
  { label: 'Rental', value: 'rental' },
  { label: 'Tax', value: 'tax' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Dating', value: 'dating' },
  { label: 'Travel', value: 'travel' },
  { label: 'Spam', value: 'spam' }, 
  { label: 'Deepfake', value: 'deepfake' }, 
  { label: 'Pharming', value: 'pharming' },
  { label: 'Job Offer', value: 'job-offer' },
  { label: 'Mule Account', value: 'mule-account' },
  { label: 'Casino', value: 'casino' },
  { label: 'Gamble', value: 'gamble' },
  { label: 'Smartphone', value: 'smartphone' }
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
                  <MultipleSelector
                    defaultOptions={OPTIONS}
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    onChange={field.onChange}
                    placeholder="Add categories"
                    value={field.value}
                  />
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
