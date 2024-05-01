import type { PageServerLoad } from './$types';
import { getAllMenuItems } from '$lib/api/menuitem';
import { getAllRestaurantVehicles } from '$lib/api/vehicles';
import { getAllRestaurantVehicleItems } from '$lib/api/restaurantVehicleMenuItem';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

export const load: PageServerLoad = async () => {
	const menu = await getAllMenuItems();
	const vehicles  = await getAllRestaurantVehicles();
	const vehicleItems = await getAllRestaurantVehicleItems();

	return {
		menu:menu,
		vehicles:vehicles,
		vehicleItems:vehicleItems,
		form: await superValidate(zod(formSchema)),
	};
};
