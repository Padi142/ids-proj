import rdb from 'rdb';

const map = rdb.map((x) => ({
	menuitem: x.table('menuitem').map(({ column }) => ({
		id: column('id').numeric().primary().notNullExceptInsert(),
		name: column('name').string(),
		description: column('description').string(),
		image: column('image').string(),
		price: column('price').numeric()
	})),

	restaurantVehicleMenuItem: x.table('restaurantvehiclemenuitem').map(({ column }) => ({
		vehicle_id: column('vehicle_id').numeric().primary().notNullExceptInsert(),
		menu_item_id: column('menu_item_id').numeric(),
		quantity: column('quantity').numeric()
	})),

	vehicle: x.table('vehicle').map(({ column }) => ({
		id: column('id').numeric().primary().notNullExceptInsert(),
		model: column('model').string(),
		license_plate: column('license_plate').string(),
		capacity: column('capacity').numeric()
	})),

	restaurantvehicle: x.table('restaurantvehicle').map(({ column }) => ({
		vehicle_id: column('vehicle_id').numeric().primary().notNullExceptInsert(),
		table_count: column('table_count').numeric()
	})),

})).map(x => ({
	restaurantVehicleMenuItem: x.restaurantVehicleMenuItem.map(({  references }) => ({
		vehicle: references(x.vehicle).by('vehicle_id'),
		menuItem: references(x.menuitem).by('menu_item_id'),
	})),
	restaurantvehicle: x.restaurantvehicle.map(({  references }) => ({
		vehicle: references(x.vehicle).by('vehicle_id'),
	})),

}));

export default map;
