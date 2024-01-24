import { z } from 'zod';

export const createScamSchema = z.object({
  description: z.string().min(1, {
    message: 'Description must be at least 1 characters.',
  }),
  name: z.string().min(1, {
    message: 'Scam name must be at least 1 characters.',
  }),
});

export type CreateScamSchema = z.infer<typeof createScamSchema>;
