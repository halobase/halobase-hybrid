<script>
	export let value = '';

	let text = 'Copy';

	async function __click() {
		await navigator.clipboard.writeText(value);
		text = 'Copied';
		setTimeout(() => {
			text = 'Copy';
		}, 2000);
	}
</script>

<div class="flex items-center gap-2">
	<input class="input" type="text" {value} readonly />
	<button class="btn btn-light btn-naked" on:click={__click}>
		{text}
	</button>
</div>
