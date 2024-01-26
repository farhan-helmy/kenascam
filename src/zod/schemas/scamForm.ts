import { z } from 'zod';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const createScamSchema = z.object({
  description: z.string().min(1, {
    message: 'Description must be at least 1 characters.',
  }),
  scamName: z.string().min(1, {
    message: 'Scam name must be at least 1 characters.',
  }),
  labels: z.array(optionSchema).min(1),
});

export type CreateScamSchema = z.infer<typeof createScamSchema>;
