import { deleteMenuItem } from '$lib/api/menuitem';

export async function DELETE({ params, request }) {
	const data = (await request.json()) as { menu_item_id: number};

	await deleteMenuItem( data.menu_item_id);
	return new Response(JSON.stringify(true), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
