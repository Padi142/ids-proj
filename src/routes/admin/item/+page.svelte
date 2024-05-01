<script lang="ts">
	import type { PageData } from './$types';

	import Form from './form.svelte';

	export let data: PageData;


</script>

<div
	class="background-color background-image h-min-screen flex flex-col items-center justify-start bg-cover pb-20 pt-8"
>
	<div class="pt-4 w-[600px]">
		<Form data={data.form} />
	</div>
</div>
