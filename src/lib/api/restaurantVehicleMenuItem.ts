import db from '$lib/db/client';
import type { RestaurantVehicleMenuItem } from '$lib/db/types/restaurantVehicleMenuItem';

export const getAllRestaurantVehicleItems = async (): Promise<RestaurantVehicleMenuItem[]> => {

	const orders = await db.restaurantVehicleMenuItem.getAll({
		vehicle: true,
		menuItem: true
	});
	return orders.map((order) =>  ({
		vehicle_id: order.vehicle!.id!,
		menu_item_id: order.menuItem!.id!,
		quantity: order.quantity!
	})) ; // Use the MenuItem class as a value
};
