import type { PageServerLoad } from './$types';
import { getAllMenuItems } from '$lib/api/menuitem';
import { getAllRestaurantVehicles } from '$lib/api/vehicles';
import { getAllRestaurantVehicleItems, sellRestaurantVehicleItem } from '$lib/api/restaurantVehicleMenuItem';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { sellMenuItemsSchema } from './schema';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    const [menu, vehicles, vehicleItems] = await Promise.all([
        getAllMenuItems(),
        getAllRestaurantVehicles(),
        getAllRestaurantVehicleItems()
    ]);

    return {
        menu:menu,
        vehicles:vehicles,
        vehicleItems:vehicleItems,
        form: await superValidate(zod(sellMenuItemsSchema))
    };
};

export const actions: Actions= {
	default: async (event) => {
		const form = await superValidate(event, zod(sellMenuItemsSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

        await sellRestaurantVehicleItem(form.data.vehicle_id, form.data.menu_item_id, +form.data.quantity);

		return {
			form,
		};
	},
};