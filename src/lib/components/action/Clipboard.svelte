<script>
	/** @type {"input" | "badge" | "plain"} */
	export let style = "input";
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
		class:input={style === "input"}
		class:badge={style === "badge"}
		class:plain={style === "plain"}
		type="text"
		{value}
		readonly
	/>
	<button
		class="btn btn-light w-16"
		class:btn-xs={style !== "input"}
		type="button"
		on:click={__click}
	>
		{text}
	</button>
</div>
