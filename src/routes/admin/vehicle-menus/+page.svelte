<script lang="ts">
	import type { PageData } from './$types';
	import type { MenuItem } from '$lib/db/types/menuItem';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	export let data: PageData;


	let baskets = data.vehicles.map((vehicle) => ({
		id: vehicle.id,
		items: data.vehicleItems
			.filter((item) => item.vehicle_id === vehicle.id)
			.map((item) => {
				const it = data.menu.filter((it) => it.id === item.menu_item_id)[0];
				return {
					name: it.name,
					description: it.description,
					image: it.image,
					price: it.price
				};
			})
	}))

	let hoveringOverBasket;

	function dragStart(event, basketIndex : number, itemIndex : number) {
		// The data we want to make available when the element is dropped
		// is the index of the item being dragged and
		// the index of the basket from which it is leaving.
		const data = {basketIndex, itemIndex};
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

	function drop(event, basketIndex : index) {
		event.preventDefault();
		const json = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(json);

		// Remove the item from one basket.
		// Splice returns an array of the deleted elements, just one in this case.
		const [item] = baskets[data.basketIndex].items.splice(data.itemIndex, 1);

		// Add the item to the drop target basket.
		baskets[basketIndex].items.push(item);
		baskets = baskets;

		hoveringOverBasket = null;
	}
</script>

<div
	class="background-color background-image h-min-screen flex flex-col items-center justify-start bg-cover pb-20 pt-8"
>
	<div class="flex flex-row items-start justify-center">
	{#each baskets as basket, basketIndex (basket)}

		<div class="w-[250px] bg-white rounded-lg shadow-lg p-4 m-4 flex flex-col items-start justify-center">
			<h2 class="text-xl font-bold">{data.vehicles[basketIndex].model +" "+ data.vehicles[basketIndex].license_plate}</h2>
			{#if data.vehicles[basketIndex].model === "tram"}
				<img
					src="https://www.tram-bus.cz/wp-content/uploads/2014/04/DSC_2430.jpg"
					alt={data.vehicles[basketIndex].model}
					class=" rounded-xl object-cover shadow-2xl"
				/>
				{:else }
				<img
				src="https://g.denik.cz/50/ef/z-kraje-poprve-otestovali-nove-vlaky-za-6-5-miliardy-podivejte-jak-vypadaji-jihomoravsky-kraj-01.jpg"
				alt={data.vehicles[basketIndex].model}
				class=" rounded-xl object-cover shadow-2xl"
				/>
				{/if}
			<ul
				class:hovering={hoveringOverBasket === basket.id}
				on:dragenter={() => hoveringOverBasket = basket.id}
				on:dragleave={() => hoveringOverBasket = null}
				on:drop={event => drop(event, basketIndex)}
				ondragover="return false"
				class="w-full"
			>
				{#each basket.items as item, itemIndex (item)}
					<div class="item w-full" >
						<li
							draggable={true}
							on:dragstart={event => dragStart(event, basketIndex, itemIndex)}
						>
							<Card.Root class="m-4 shadow-xl hover:bg-slate-100 hover:shadow-2xl">
								<Card.Header>
									<Card.Title class="text-center">{item.name}</Card.Title>
								</Card.Header>
								<Card.Content>
									<div class="flex flex-col items-center justify-between">
										<img
											src={item.image}
											alt={item.image}
											class="  rounded-xl object-cover shadow-2xl"
										/>


									</div>
								</Card.Content>
							</Card.Root>
						</li>
					</div>
				{/each}
				{#if basket.items.length === 0}
					<div class="h-20">

					</div>
				{/if}
			</ul>
		</div>
		{/each}
	</div>
</div>

