import { z } from 'zod';

export const formSchema = z.object({
	name: z.string().min(3).max(30),
	description: z.string().min(3).max(300),
	image: z.string().url().default('https://storage.googleapis.com/superkauf/logos/logo1.png'),
	price: z.string()
		.min(1)
		.refine((value) => /^\d*\.?\d+$/.test(value), 'Invalid number')
});

export type FormSchema = typeof formSchema;