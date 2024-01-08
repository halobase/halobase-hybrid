<script>
	import { enhance } from "$app/forms";
	import { createEventDispatcher } from "svelte";

	/** @type {import("$lib/tailwind/types").Variants | ""} */
	export let color = "alpha";
	/** @type {"row" | "col"} */
	export let direction = "col";
	/** @type {"left" | "right" | "full"} */
	export let align = "right";
	/** @type {"get" | "post" | "dialog"} */
	export let method = "post";
	export let action = "?";
	/** @type {"application/x-www-form-urlencoded" | "multipart/form-data"} */
	export let enctype = "application/x-www-form-urlencoded";
	export let reset = false;
	export let disabled = false;
	export let with_cancel = false;

	let error = "";
	let pending = false;

	const dispatch = createEventDispatcher();
</script>

<form
	{action}
	{method}
	{enctype}
	class="form flex gap-4 flex-{direction}"
	use:enhance={function () {
		pending = true;
		return async ({ update, result }) => {
			await update({ reset });
			switch (result.type) {
				case "failure":
					error = `[${result.status}] ${result.data?.message}`;
					dispatch("failure", result.data);
					break;
				case "success":
					dispatch("success", result.data);
					break;
			}
			pending = false;
		};
	}}
>
	<slot />
	{#if error}
		<div class="card card-error">{error}</div>
	{/if}
	<div
		class="flex gap-3"
		class:justify-start={align === "left"}
		class:justify-end={align === "right"}
		class:flex-col-reverse={align === "full"}
	>
		{#if with_cancel}
			<button
				class="btn btn-ghost"
				type="button"
				on:click={() => dispatch("cancel")}
			>
				<slot name="cancel">Cancel</slot>
			</button>
		{/if}
		<button
			class="btn btn-{color}"
			type="submit"
			disabled={pending || disabled}
		>
			{#if pending}
				<svg
					class="animate-spin mr-2 h-4 w-4 text-back"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				<slot name="pending">Pending</slot>
			{:else}
				<slot name="submit">Submit</slot>
			{/if}
		</button>
	</div>
</form>
