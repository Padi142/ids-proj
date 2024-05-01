<script lang="ts">
	import type { PageData } from './$types';
	import { tick } from 'svelte';
	import { cn } from '$lib/utils';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import Check from 'svelte-radix/Check.svelte';
	import Form from './form.svelte';

	export let data: PageData;

	const vehicles = data.vehicles.map((vehicle) => ({
		value: vehicle.id,
		label: vehicle.model + ' ' + vehicle.license_plate
	}));

	//filter items based on menu.vehicleItems where vehicle_id = selectedVehicle and map that to data.menu
	$: items = data.vehicleItems
		.filter((item) => item.vehicle_id === selectedVehicle)
		.map((item) => {
			const it = data.menu.filter((it) => it.id === item.menu_item_id)[0];
			return {
				name: it.name,
				description: it.description,
				image: it.image,
				price: it.price
			};
		});

	let open = false;

	let selectedVehicle = 1;

	$: selectedValue =
		vehicles.find((f) => f.value === selectedVehicle)?.label ?? 'Select a vehicle...';

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
	class="background-color background-image h-min-screen flex flex-col items-center justify-start bg-cover pb-20 pt-8"
>
	<p class="w-[600px] pb-2 text-sm font-medium">Vehicle</p>
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-[600px] justify-between"
			>
				{selectedValue}
				<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
									'mr-2 h-4 w-4',
									selectedValue !== vehicle.value.toString() && 'text-transparent'
								)}
							/>
							{vehicle.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	<p class="w-[600px] pt-2 text-[0.8rem] text-muted-foreground">Vehicle</p>
	<div class="pt-4">
		<Form data={data.form} />
	</div>
</div>
