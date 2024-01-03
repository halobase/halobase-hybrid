<script>
	import Dialog from "./Dialog.svelte";
	import { Form } from "../form";

	/** @type {boolean} */
	export let enable;
	/** @type {string} */
	export let action;
	/** @type {import("$lib/tailwind/types").Variants} */
	export let color = "alpha";
	export let title = "Please confirm";
</script>

<Dialog bind:enable {title}>
	<div class="md:w-96">
		<slot name="extra">
			<p>You will NOT be enable to undo this operation.</p>
		</slot>
		<div class="mt-4">
			<Form {action} {color} on:failure on:success>
				<slot />
				<svelte:fragment slot="cancel">Cancel</svelte:fragment>
				<svelte:fragment slot="submit">Confirm</svelte:fragment>
			</Form>
		</div>
	</div>
</Dialog>
