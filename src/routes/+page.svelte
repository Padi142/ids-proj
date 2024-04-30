<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;
</script>

<div
	class="background-color background-image h-min-screen flex flex-col items-center justify-start bg-cover"
>
	{#each data.menu as item}
		<Card.Root class="m-4 w-[500px] shadow-xl hover:bg-slate-100 hover:shadow-2xl">
			<Card.Header>
				<Card.Title class="text-center">{item.name}</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-row items-center justify-start">
					<img
						src={item.image}
						alt={item.image}
						class="h-40 w-40 rounded-xl object-cover shadow-2xl"
					/>
					<p class="p-4">
						{item.description}
					</p>
				</div>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
