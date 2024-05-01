import type { PageServerLoad } from './$types';

import {  getAllMenuItems } from '$lib/api/menuitem';
import { getAllRestaurantVehicles } from '$lib/api/vehicles';
import {
	getAllRestaurantVehicleItems
} from '$lib/api/restaurantVehicleMenuItem';

export const load: PageServerLoad = async () => {
	const [menu, vehicles, vehicleItems] = await Promise.all([
		getAllMenuItems(),
		getAllRestaurantVehicles(),
		getAllRestaurantVehicleItems()
	]);

	return {
		menu:menu,
		vehicles:vehicles,
		vehicleItems:vehicleItems
	};
};

