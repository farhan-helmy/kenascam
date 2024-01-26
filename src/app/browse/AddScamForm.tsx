import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreateScamSchema } from '@/zod/schemas/scamForm';
import { createScamSchema } from '@/zod/schemas/scamForm';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadForm from '@/components/ui/upload-form';
import { Button } from '@/components/ui/button';
import MultipleSelector, {Option} from '@/components/ui/multiple-selector';

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
  const form = useForm<CreateScamSchema>({
    defaultValues: {
      description: '',
      scamName: '',
      labels: []
    },
    resolver: zodResolver(createScamSchema),
  });

  function onSubmit(values: CreateScamSchema) {
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
          
          <FormField
          control={form.control}
          name="labels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Labels</FormLabel>
              <FormControl>
                <MultipleSelector
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={OPTIONS}
                  placeholder="Select label for the scam"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
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
