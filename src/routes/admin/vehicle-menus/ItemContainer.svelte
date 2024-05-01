<script lang="ts">
	import type { MenuItem } from '$lib/db/types/menuItem';
	import * as Card from '$lib/components/ui/card/index.js';

	export let item: MenuItem;
</script>

<Card.Root class="m-4 shadow-xl hover:bg-slate-100 hover:shadow-2xl">
	<Card.Header>
		<Card.Title class="text-center">{item.name}</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col items-center justify-between">
			<img src={item.image} alt={item.image} class="rounded-xl object-cover shadow-2xl w-44 h-28" />
		</div>
	</Card.Content>
</Card.Root>
