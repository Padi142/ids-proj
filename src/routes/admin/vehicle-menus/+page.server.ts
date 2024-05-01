import type { Actions,PageServerLoad } from './$types';

import { createMenuItem, getAllMenuItems } from '$lib/api/menuitem';
import { getAllRestaurantVehicles } from '$lib/api/vehicles';
import {
	createRestaurantVehicleItem,
	deleteRestaurantVehicleItem,
	getAllRestaurantVehicleItems
} from '$lib/api/restaurantVehicleMenuItem';
import {  superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	const menu = await getAllMenuItems();
	const vehicles  = await getAllRestaurantVehicles();
	const vehicleItems = await getAllRestaurantVehicleItems();

	return {
		menu:menu,
		vehicles:vehicles,
		vehicleItems:vehicleItems
	};
};

