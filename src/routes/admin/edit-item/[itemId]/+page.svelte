<script lang="ts">
	import type { PageData } from './$types';


	import Form from './form.svelte';
	import ItemContainer from '../../vehicle-menus/ItemContainer.svelte';
	import { superValidate } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { CreateItemFormSchema } from '../../item/create_schema';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$:items = data.menu.map((item) => item);

	async function deleteItem( menu_item_id: number, index: number) {
		const [item] = items.splice(index, 1);
		items = items;

		const body = JSON.stringify({  "menu_item_id": menu_item_id });
		const rawResponse = await fetch(document.location.href, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: body
		});
		await rawResponse.json();
		 // await goto(document.location.host+ "/admin/edit-item/" + items[0].id);
		// await goto("./" + items[0].id);
		await goto("/admin/edit-item/" + items[0].id);
	}


</script>

<div
	class="background-color background-image h-min-screen flex flex-col items-center justify-start bg-cover pb-20 pt-8"
>
	<div class="flex w-full flex-row items-center justify-between px-14">
		<div></div>
		<a href="/admin"> Admin </a>
	</div>
<div
	class="flex flex-row items-center justify-center"
>
	{#each data.menu as item, itemIndex (item)}
		<a href={"/admin/edit-item/"+item.id}>
			<div class=" w-[250px]" >
				<ItemContainer {item} />
			</div>
		</a>
	{/each}
</div>
	<div class="pt-4 w-[600px]">
		<Form data={data.form}  onDelete={()=>deleteItem(+data.itemId, items.indexOf(items.find((it)=> it.id === +data.itemId)))} />
	</div>
</div>
