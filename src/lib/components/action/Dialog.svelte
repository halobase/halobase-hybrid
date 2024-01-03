<script>
	/** @type {boolean} */
	export let enable;
	/** @type {boolean} */
	export let self_closable = false;
	export let title = "Title";

	/** @type {HTMLDialogElement} */
	let ref;

	$: if (enable) {
		ref?.showModal();
	} else {
		ref?.close();
	}

	function __close() {
		if (ref && self_closable) {
			ref.close();
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="dialog"
	bind:this={ref}
	on:close={() => (enable = false)}
	on:click|self={__close}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<form method="dialog">
			<button
				class="btn btn-square btn-xs btn-ghost absolute top-0 right-0"
				type="submit"
				title="close"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
					/>
				</svg>
			</button>
		</form>
		<slot name="title">
			<h2 class="text-lg font-medium mb-2">{title}</h2>
		</slot>
		<slot />
	</div>
</dialog>
