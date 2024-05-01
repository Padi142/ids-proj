import db from '$lib/db/client';
import type { RestaurantVehicleMenuItem } from '$lib/db/types/restaurantVehicleMenuItem';

export const getAllRestaurantVehicleItems = async (): Promise<RestaurantVehicleMenuItem[]> => {

	const orders = await db.restaurantVehicleMenuItem.getAll({
		vehicle: true,
		menuItem: true
	});
	return orders.map((order) => ({
		vehicle_id: order.vehicle!.id!,
		menu_item_id: order.menuItem!.id!,
		quantity: order.quantity!
	})); // Use the MenuItem class as a value
};

export const createRestaurantVehicleItem = async (vehicle_id: number, menu_item_id: number, quantity: number): Promise<boolean> => {
	await db.restaurantVehicleMenuItem.insert({
		vehicle_id,
		menu_item_id,
		quantity
	});
	return true;
}

export const deleteRestaurantVehicleItem = async (vehicle_id: number, menu_item_id: number): Promise<boolean> => {
	const filter = db.restaurantVehicleMenuItem.vehicle_id.equal(vehicle_id).and(db.restaurantVehicleMenuItem.menu_item_id.equal(menu_item_id));

	await db.restaurantVehicleMenuItem.delete(filter);
	return true;
}
export const sellRestaurantVehicleItem = async (vehicle_id: number, menu_item_id: number, sold: number) => {
	const vehicleItem = await db.restaurantVehicleMenuItem.getById(vehicle_id, menu_item_id);

	console.log("VehicleItem", vehicleItem);

	if (!vehicleItem) {
		return false;
	}

	if (vehicleItem.quantity! < sold) {
		return false;
	}

	vehicleItem.quantity = vehicleItem.quantity! - +sold;

	await vehicleItem.saveChanges();
}