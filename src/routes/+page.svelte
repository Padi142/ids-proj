<script lang="ts">
	import Check from 'svelte-radix/Check.svelte';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { cn } from '$lib/utils.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageData } from './$types';

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
				price: it.price,
				quantity: item.quantity,
				menu_item_id: item.menu_item_id
			};
		});

	let open = false;
	let dialogOpen = false;

	let mlemmlem;

	let selectedVehicle = 1;
	let selectedMenuItem: number | null = null;

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
	<div class="flex w-full flex-row items-center justify-between px-14">
		<div></div>
		<a href="/admin"> Admin </a>
	</div>
	<h1 class="text-center text-4xl font-bold text-slate-700">Restaurant Vehicle Menu</h1>
	<div class="m-8">
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
						class="h-40 w-40 rounded-xl object-cover shadow-2xl"
					/>
					<p class="w-full p-4">
						{item.description}
					</p>
					<div class="flex flex-col">
						<div class="flex items-center justify-between">
							<p>
								{item.quantity} ks
							</p>
							<p>
								{item.price}Kč
							</p>
						</div>
						<Dialog.Root open={dialogOpen} onOpenChange={(x) => (dialogOpen = x)}>
							<Dialog.Trigger
								on:click={() => (selectedMenuItem = item.menu_item_id)}
								class={buttonVariants({ variant: 'outline' })}>Prodat</Dialog.Trigger
							>
							<Dialog.Content class="sm:max-w-[425px]">
								<Dialog.Header>
									<Dialog.Title>Prodat položku</Dialog.Title>
									<Dialog.Description>Zvol počet kusů na prodej</Dialog.Description>
								</Dialog.Header>
								<div class="grid gap-4 py-4">
									<div class="grid grid-cols-4 items-center gap-4">
										<Label for="quantity" class="text-right">Počet</Label>
										<Input id="quantity" bind:value={mlemmlem} class="col-span-3" />
									</div>
								</div>
								<Dialog.Footer>
									<Button
										on:click={async () => {
											dialogOpen = false;
											const x = document.getElementById('quantity');

											console.log(mlemmlem);
											if (isNaN(+x.value)) return alert('Invalid quantity');

											await fetch(document.location.href, {
												method: 'POST',
												headers: {
													Accept: 'application/json',
													'Content-Type': 'application/json'
												},
												body: JSON.stringify({
													vehicle_id: selectedVehicle,
													menu_item_id: selectedMenuItem,
													quantity: x.value
												})
											});
											selectedMenuItem = null;
										}}
										type="submit">Prodat</Button
									>
								</Dialog.Footer>
							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
