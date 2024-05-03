import { z } from 'zod';

export const sellMenuItemsSchema = z.object({
	menu_item_id: z.number(),
	vehicle_id: z.number(),
	quantity: z.string()
		.min(1)
		.refine((value) => /^\d*\.?\d+$/.test(value), 'Invalid number')
});

export type SellMenuItemsSchema = typeof sellMenuItemsSchema;