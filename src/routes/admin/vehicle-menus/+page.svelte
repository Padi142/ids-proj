<script lang="ts">
	import type { PageData } from './$types';
	import type { MenuItem } from '$lib/db/types/menuItem';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import ItemContainer from './ItemContainer.svelte';
	export let data: PageData;

	async function createItem(vehicle_id: number, menu_item_id: number) {
		const body = JSON.stringify({ "vehicle_id": vehicle_id, "menu_item_id": menu_item_id });
		const rawResponse = await fetch(document.location.href, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},
			body: body
		});
		await rawResponse.json();

	}
	async function deleteItem(vehicle_id: number, menu_item_id: number) {
		const body = JSON.stringify({ "vehicle_id": vehicle_id, "menu_item_id": menu_item_id });
		const rawResponse = await fetch(document.location.href, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},
			body: body
		});
		await rawResponse.json();

	}

	let  baskets = data.vehicles.map((vehicle) => ({
		id: vehicle.id,
		items: data.vehicleItems
			.filter((item) => item.vehicle_id === vehicle.id)
			.map((item) => {
				const it = data.menu.filter((it) => it.id === item.menu_item_id)[0];
				return {
					id: it.id,
					name: it.name,
					description: it.description,
					image: it.image,
					price: it.price
				};
			})
	}));

	baskets.push({ id: -1, items: data.menu });

	let hoveringOverBasket;

	function dragStart(event, basketIndex: number, itemIndex: number) {
		// The data we want to make available when the element is dropped
		// is the index of the item being dragged and
		// the index of the basket from which it is leaving.
		const data = { basketIndex, itemIndex };
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

	async function drop(event, basketIndex: index) {
		event.preventDefault();
		console.log(baskets)
		const json = event.dataTransfer.getData('text/plain');
		const data = JSON.parse(json);

		// Remove the item from one basket.
		// Splice returns an array of the deleted elements, just one in this case.

		if (data.basketIndex === -1) {
			const item = baskets[baskets.length - 1].items[data.itemIndex];
			if(baskets[basketIndex].items.filter((it) => it.id === item.id).length === 0){
			baskets[basketIndex].items.push({ ...item });
			await createItem(baskets[basketIndex].id, item.id);
			}
			baskets = baskets;
			hoveringOverBasket = null;
			return;
		}

		const [item] = baskets[data.basketIndex].items.splice(data.itemIndex, 1);
		await deleteItem(baskets[data.basketIndex].id, item.id);

		// Add the item to the drop target basket.
		if(basketIndex !== -1 && baskets[basketIndex].items.filter((it) => it.id === item.id).length === 0){
		baskets[basketIndex].items.push({ ...item });
		await createItem(baskets[basketIndex].id, item.id);
		}
		baskets = baskets;

		hoveringOverBasket = null;
	}
</script>

<div
	class="flex flex-col items-center justify-start pt-8 pb-20 bg-cover background-color background-image h-min-screen"
>
	<p>All Items</p>
		<ul
			class:hovering={hoveringOverBasket === -1}
			on:dragenter={() => (hoveringOverBasket = -1)}
			on:dragleave={() => (hoveringOverBasket = null)}
			on:drop={(event) => drop(event, -1)}
			class="flex flex-row items-center justify-center"
			ondragover="return false"
		>
			{#each baskets[baskets.length - 1].items as item, itemIndex (item)}
				<li draggable={true} on:dragstart={(event) => dragStart(event, -1, itemIndex)}>
					<div class=" w-[250px]">
						<ItemContainer {item} />
					</div>
				</li>
			{/each}
		</ul>
	<div class="flex flex-row items-start justify-center">
		{#each baskets as basket, basketIndex (basket)}
			{#if basket.id !== -1}
				<div
					class="m-4 flex w-[250px] flex-col items-start justify-center rounded-lg bg-white p-4 shadow-lg"
				>
					<h2 class="text-xl font-bold">
						{data.vehicles[basketIndex].model + ' ' + data.vehicles[basketIndex].license_plate}
					</h2>
					{#if data.vehicles[basketIndex].model === 'tram'}
						<img
							src="https://www.tram-bus.cz/wp-content/uploads/2014/04/DSC_2430.jpg"
							alt={data.vehicles[basketIndex].model}
							class="object-cover shadow-2xl rounded-xl"
						/>
					{:else}
						<img
							src="https://g.denik.cz/50/ef/z-kraje-poprve-otestovali-nove-vlaky-za-6-5-miliardy-podivejte-jak-vypadaji-jihomoravsky-kraj-01.jpg"
							alt={data.vehicles[basketIndex].model}
							class="object-cover shadow-2xl rounded-xl"
						/>
					{/if}
					<ul
						class:hovering={hoveringOverBasket === basket.id}
						on:dragenter={() => (hoveringOverBasket = basket.id)}
						on:dragleave={() => (hoveringOverBasket = null)}
						on:drop={(event) => drop(event, basketIndex)}
						ondragover="return false"
						class="w-full"
					>
						{#each basket.items as item, itemIndex (item)}
							<li
								draggable={true}
								on:dragstart={(event) => dragStart(event, basketIndex, itemIndex)}
							>
								<div class="w-full item">
									<ItemContainer {item} />
								</div>
							</li>
						{/each}
						{#if basket.items.length === 0}
							<div class="h-20"></div>
						{/if}
					</ul>
				</div>
			{/if}
		{/each}
	</div>
</div>
