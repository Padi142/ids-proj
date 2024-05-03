<script lang="ts">
	import type { PageData } from './$types';

	import Form from './form.svelte';

	export let data: PageData;


</script>

<div
	class="background-color background-image h-min-screen flex flex-col items-center justify-start bg-cover pb-20 pt-8"
>
	<div class="flex w-full flex-row items-center justify-between px-14">
		<div></div>
		<a href="/admin"> Admin </a>
	</div>
	<div class="pt-4 w-[600px]">
		<Form data={data.form} />
	</div>
</div>
