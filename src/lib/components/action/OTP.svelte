<script>
	import { createEventDispatcher } from "svelte";

	/** @type {string} */
	export let id;
	/** @type {string} */
	export let endpoint;
	/** @type {number} */
	let timer;

	let tick = 60;

	const dispatch = createEventDispatcher();

	async function send() {
		const res = await fetch(endpoint, {
			method: "POST",
			body: JSON.stringify({ id }),
		});
		if (!res.ok) {
			return dispatch("failure", await res.json());
		}
		timer = setInterval(function () {
			tick--;
			if (tick == 0 && timer) {
				clearInterval(timer);
				tick = 60;
			}
		}, 1000);
	}
</script>

<button class="btn" on:click={send} disabled={tick < 60}>
	{#if tick < 60}
		{tick}s
	{:else}
		Send OTP
	{/if}
</button>
