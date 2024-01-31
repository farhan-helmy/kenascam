import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { CreateScamSchema } from '@/zod/schemas/scamForm';
import { createScamSchema } from '@/zod/schemas/scamForm';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadForm from '@/components/ui/upload-form';
import { Button } from '@/components/ui/button';
import type { Option } from '@/components/ui/multiple-selector';
import MultipleSelector from '@/components/ui/multiple-selector';
import { createScam } from '@/service/scam';
import { toast } from 'sonner';

const OPTIONS: Option[] = [
  { label: 'Phishing', value: 'phishing' },
  { label: 'Social Media', value: 'social-media' },
  { label: 'Online Shopping', value: 'online-shopping' },
  { label: 'Financial', value: 'financial' },
  { label: 'Impersonation', value: 'impersonation' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Whatsapp', value: 'whatsapp' },
  { label: 'APK', value: 'apk' },
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
      labels: [],
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
      description: values.description,
      fileKey: fileKey,
      labels: values.labels,
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
            name="labels"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Labels</FormLabel>
                <FormControl>
                  <MultipleSelector
                    defaultOptions={OPTIONS}
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    onChange={field.onChange}
                    placeholder="Select label for the scam"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
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
