import { z } from 'zod';

export const formSchema = z.object({
	name: z.string().min(3).max(30),
	description: z.string().min(3).max(300),
	image: z.string().min(3).max(300),
	price: z.number().int().positive(),
});

export type FormSchema = typeof formSchema;