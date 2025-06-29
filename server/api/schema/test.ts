import { z } from 'zod';

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const fieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  label: z.string(),
  question: z.string(),
  type: z.enum([
    'text',
    'number',
    'textarea',
    'radioButton',
    'checkboxGroup',
    'checkboxMultiple',
  ]),
  required: z.boolean(),
  points: z.number().int().nonnegative(),
  correct: z.array(z.string()),
  placeholder: z.string().optional(),
  options: z.array(optionSchema).optional(),
});

export const testSchema = z.object({
  fileName: z.string().regex(/\.json$/, { message: 'fileName must end with .json' }),
  title: z.string(),
  description: z.string(),
  fields: z.array(fieldSchema).min(1),
});