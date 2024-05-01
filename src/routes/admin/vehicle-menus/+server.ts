import { createRestaurantVehicleItem, deleteRestaurantVehicleItem } from '$lib/api/restaurantVehicleMenuItem';

export async function POST({ params, request }) {
	const data = (await request.json()) as {vehicle_id: number, menu_item_id: number};

	await createRestaurantVehicleItem(data.vehicle_id, data.menu_item_id, 20);
	return new Response(JSON.stringify(true), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export async function DELETE({ params, request }) {
	const data = (await request.json()) as {vehicle_id: number, menu_item_id: number};

	await deleteRestaurantVehicleItem(data.vehicle_id, data.menu_item_id);
	return new Response(JSON.stringify(true), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
