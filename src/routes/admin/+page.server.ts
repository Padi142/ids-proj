import type { PageServerLoad } from './$types';
import { getAllMenuItems } from '$lib/api/menuitem';
import { getAllRestaurantVehicles } from '$lib/api/vehicles';
import { getAllRestaurantVehicleItems } from '$lib/api/restaurantVehicleMenuItem';

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
