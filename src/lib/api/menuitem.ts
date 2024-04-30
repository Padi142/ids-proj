import db from '$lib/db/client';
import type { MenuItem } from '$lib/db/types/menuItem';
export const getMenuItemsForCar = async (vehicleID: number): Promise<MenuItem[]> => {
    const filter = db.restaurantVehicleMenuItem.vehicle_id.equal(vehicleID);
    const orders = await db.restaurantVehicleMenuItem.getMany(filter,{
        menuItem: true,
        deliveryAddress: true,
        customer: true
    });
    return orders.map((order) =>  ({
        id: order.menuItem!.id!,
        name: order.menuItem!.name!,
        description: order.menuItem!.description!,
        image: order.menuItem!.image!,
        price: order.menuItem!.price!,
    })) ; // Use the MenuItem class as a value
};

	export const getAllMenuItems = async (): Promise<MenuItem[]> => {
		const menuItems = await db.menuitem.getAll();
		return menuItems.map((menuItem) => ({
				id: menuItem.id!,
				name: menuItem.name!,
				description: menuItem.description!,
				image: menuItem.image!,
				price: menuItem.price!,
		}));
	};

