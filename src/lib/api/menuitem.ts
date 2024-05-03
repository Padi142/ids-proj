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

export const getMenuItemById = async ( itemId : number): Promise<MenuItem> => {
	const filter = db.menuitem.id.equal(itemId);

	const menuItem = await db.menuitem.getOne( filter);
	return {
		id: menuItem.id!,
		name: menuItem.name!,
		description: menuItem.description!,
		image: menuItem.image!,
		price: menuItem.price!,
	};
};

export  const createMenuItem = async (name: string, description: string, image: string, price: number): Promise<boolean> => {
const 	id = randomIntFromInterval(1, 365465654);


	await db.menuitem.insert({
		id,
		name,
		description,
		image,
		price
	});
	return true;
}
export const deleteMenuItem = async (menu_item_id: number): Promise<boolean> => {
	const filter = db.menuitem.id.equal(menu_item_id)

	await db.menuitem.delete(filter);
	return true;
}

export const updateMenuItem = async (newItem:MenuItem) => {
	const filter = db.menuitem.id.equal(newItem.id);

	const menuItem = await db.menuitem.getOne( filter);


	if (!menuItem) {
		return false;
	}

	menuItem.description = newItem.description;
	menuItem.image = newItem.image;
	menuItem.name = newItem.name;
	menuItem.price = newItem.price;


	await menuItem.saveChanges();
}

function randomIntFromInterval(min : number, max : number	) { // min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

