import rdb from 'rdb';

const map = rdb.map((x) => ({
	menuitem: x.table('menuitem').map(({ column }) => ({
		id: column('id').numeric().primary().notNullExceptInsert(),
		name: column('name').string(),
		description: column('description').string(),
		image: column('image').string(),
		price: column('price').numeric()
	}))
}));

export default map;
