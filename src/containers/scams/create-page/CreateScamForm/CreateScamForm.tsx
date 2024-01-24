'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StatusCodes } from 'http-status-codes';
import type { CreateScamSchema } from '@/zod/schemas/scamForm';
import { createScamSchema } from '@/zod/schemas/scamForm';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadForm from '@/components/ui/upload-form';
import { Button } from '@/components/ui/button';

export default function CreateScamForm() {
  const form = useForm<CreateScamSchema>({
    defaultValues: {
      description: '',
      name: '',
    },
    resolver: zodResolver(createScamSchema),
  });

  async function onSubmit(values: CreateScamSchema) {
    // Todo: This is just a temporary solution.
    const axios = (await import('axios')).default;
    try {
      const response = await axios.post('/api/scams', {
        description: values.description,
        name: values.name,
      });

      if (response.status === StatusCodes.CREATED) {
        // Todo: handle success properly.
        form.reset();
      } else {
        form.setError('root', { message: 'Server error. Please try again.' });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.BAD_REQUEST) {
        const nameError = error.response.data?.errors?.name as string | undefined;
        if (nameError) {
          form.setError('name', { message: nameError });
        }
        const descriptionError = error.response.data?.errors?.description as string | undefined;
        if (descriptionError) {
          form.setError('description', { message: descriptionError });
        }
      } else {
        form.setError('root', { message: 'Server error. Please try again.' });
      }
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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

        <div className="">
          <FormLabel>Picture</FormLabel>
          <UploadForm />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit">Submit</Button>
          <p className="text-sm font-bold text-destructive">{form.formState.errors.root?.message}</p>
        </div>
      </form>
    </Form>
  );
}
