import { sellRestaurantVehicleItem } from '$lib/api/restaurantVehicleMenuItem.js';
import { error } from '@sveltejs/kit';


export async function POST({ request }) {
    const data = (await request.json()) as { vehicle_id: number, menu_item_id: number, quantity: number};

    await sellRestaurantVehicleItem(data.vehicle_id, data.menu_item_id, data.quantity);

    return new Response(JSON.stringify(true), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}