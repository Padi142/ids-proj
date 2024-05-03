import type { Actions,PageServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { CreateItemFormSchema } from '../../item/create_schema';
import { fail, redirect } from '@sveltejs/kit';
import { createMenuItem, getAllMenuItems, getMenuItemById, updateMenuItem } from '$lib/api/menuitem';
import type { MenuItem } from '$lib/db/types/menuItem';

export const load: PageServerLoad = async ({ params }) => {

	const item = await getMenuItemById(+params.itemId);
	const menu = await getAllMenuItems();
	// const vehicles  = await getAllRestaurantVehicles();
	// const vehicleItems = await getAllRestaurantVehicleItems();

	return {
		itemId: params.itemId,
		menu:menu,
		form: await superValidate({
			name: item.name,
			image: item.image,
			description: item.description,
			price: item.price.toString(),

		}, zod(CreateItemFormSchema)),
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

		const item : MenuItem ={ id: +event.params.itemId, name: form.data.name, description: form.data.description, image: form.data.image, price: +form.data.price};

		await updateMenuItem(item);
		throw  redirect(300, `/admin/edit-item/${event.params.itemId}`);


	},
};