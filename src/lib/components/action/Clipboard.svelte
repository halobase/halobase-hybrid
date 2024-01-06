<script>
	/** @type {"normal" | "tight"} */
	export let size = "normal";
	export let value = "";

	let text = "Copy";

	async function __click() {
		await navigator.clipboard.writeText(value);
		text = "Copied";
		setTimeout(() => {
			text = "Copy";
		}, 2000);
	}
</script>

<div class="flex items-center gap-2">
	<input
		class:input={size === "normal"}
		class:badge={size === "tight"}
		type="text"
		{value}
		readonly
	/>
	<button
		class="btn btn-light btn-naked w-16"
		class:btn-xs={size === "tight"}
		type="button"
		on:click={__click}
	>
		{text}
	</button>
</div>
