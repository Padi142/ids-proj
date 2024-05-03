import type { Actions,PageServerLoad } from './$types';

import { createMenuItem } from '$lib/api/menuitem';
import {  superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { CreateItemFormSchema } from './create_schema';
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	// const menu = await getAllMenuItems();
	// const vehicles  = await getAllRestaurantVehicles();
	// const vehicleItems = await getAllRestaurantVehicleItems();

	return {
		// menu:menu,
		// vehicles:vehicles,
		// vehicleItems:vehicleItems,
		form: await superValidate(zod(CreateItemFormSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(CreateItemFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		await createMenuItem(form.data.name, form.data.description, form.data.image, +form.data.price);

		return {
			form,
		};
	},
};