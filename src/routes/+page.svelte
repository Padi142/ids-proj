<script lang="ts">
	import Check from "svelte-radix/Check.svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import { tick } from "svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { PageData } from './$types';

	export let data: PageData;

	const vehicles = data.vehicles.map((vehicle) => ({
		value: vehicle.id,
		label: vehicle.model + " " + vehicle.license_plate,
	}));

	//filter items based on menu.vehicleItems where vehicle_id = selectedVehicle and map that to data.menu
	$: items = data.vehicleItems.filter((item) => item.vehicle_id === selectedVehicle).map((item) => {
		const it = data.menu.filter((it) => it.id === item.menu_item_id)[0];
		return {
			name:it.name,
			description:it.description,
			image:it.image,
			price:it.price
		};
	});

	let open = false;

	let selectedVehicle = 1;

	$: selectedValue =
		vehicles.find((f) => f.value === selectedVehicle)?.label ?? "Select a vehicle...";

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<div
	class="flex flex-col items-center justify-start bg-cover background-color background-image h-min-screen  pt-8 pb-20"
>
	<div class="w-full flex flex-row items-center justify-between px-14">
		<div></div>
		<a href="/admin">
			Admin
		</a>
	</div>
	<h1 class="text-4xl font-bold text-center text-slate-700">Restaurant Vehicle Menu</h1>
	<div class="m-8">

	<Popover.Root bind:open let:ids >
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-[600px] justify-between"
			>
				{selectedValue}
				<CaretSort class="w-4 h-4 ml-2 opacity-50 shrink-0" />
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-[600px] p-0">
			<Command.Root>
				<Command.Input placeholder="Search vehicle..." class="h-9" />
				<Command.Empty>No vehicle found.</Command.Empty>
				<Command.Group>
					{#each vehicles as vehicle}
						<Command.Item
							value={vehicle.value.toString()}
							onSelect={(currentValue) => {
								console.log(currentValue);
              selectedVehicle = +currentValue;
              closeAndFocusTrigger(ids.trigger);
            }}
						>
							<Check
								class={cn(
                "mr-2 h-4 w-4",
                selectedValue !== vehicle.value.toString() && "text-transparent"
              )}
							/>
							{vehicle.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	</div>

	{#each items as item}
		<Card.Root class="m-4 w-[600px] shadow-xl hover:bg-slate-100 hover:shadow-2xl">
			<Card.Header>
				<Card.Title class="text-center">{item.name}</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-row items-center justify-between">
					<img
						src={item.image}
						alt={item.image}
						class="object-cover w-40 h-40 shadow-2xl rounded-xl"
					/>
					<p class="p-4 w-full">
						{item.description}
					</p>
					<p>
						{item.price}Kč
					</p>
				</div>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
