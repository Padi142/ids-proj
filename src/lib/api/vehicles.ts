import db from '$lib/db/client';
import type { Vehicle } from '$lib/db/types/vehicle';

export const getAllRestaurantVehicles = async (): Promise<Vehicle[]> => {

	const orders = await db.restaurantvehicle.getAll({
		vehicle: true,
	});
	return orders.map((order) =>  ({
			id: order.vehicle!.id!,
			model: order.vehicle!.model!,
			license_plate: order.vehicle!.license_plate!,
			capacity: order.vehicle!.capacity!,
	})) ; // Use the MenuItem class as a value
};
