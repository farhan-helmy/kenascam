import { z } from 'zod';

const optionSchema = z.object({
  disable: z.boolean().optional(),
  label: z.string(),
  value: z.string(),
});

export const createScamSchema = z.object({
  tags: z.array(optionSchema).min(1),
  description: z.string().min(1, {
    message: 'Description must be at least 1 characters.',
  }),
  fileKey: z.array(z.string()).min(1).optional(),
  name: z.string().min(1, {
    message: 'Scam name must be at least 1 characters.',
  }),
});

export type CreateScamSchema = z.infer<typeof createScamSchema>;
