<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import { formSchema, type FormSchema } from "./schema";
	import SuperDebug, {
		type SuperValidated,
		type Infer,
		superForm,
	} from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { Textarea } from '$lib/components/ui/textarea';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name" class="w-full">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input class="bg-white" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>Name of the new item</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea class="bg-white h-32" {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.Description> Description </Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="image">
		<Form.Control let:attrs>
			<Form.Label>Image</Form.Label>
			<Input class="bg-white" {...attrs} bind:value={$formData.image} />
		</Form.Control>
		<Form.Description> Image of the food </Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="price">
		<Form.Control let:attrs>
			<Form.Label>Price</Form.Label>
			<Input type="number" class="bg-white" {...attrs} bind:value={$formData.price}  />
		</Form.Control>
		<Form.Description>Price</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
<div class="pt-10" ></div>
<SuperDebug data={$formData} />
</form>