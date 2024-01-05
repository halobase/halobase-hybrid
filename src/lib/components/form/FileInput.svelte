<script>
	import { createEventDispatcher } from "svelte";

	/** @type {string} */
	export let endpoint;
	export let multiple = false;
	export let accept = "*";
	export let auth = "";
	export let maxsize = 0;

	const dispatch = createEventDispatcher();

	/** @type {FileList} */
	let files;
	/** @type {Promise<any>} */
	let p;

	let done = 0;

	function __change() {
		for (const file of files) {
			if (maxsize > 0 && maxsize < file.size) {
				return dispatch("failure", {
					file: file,
					error: "File too large",
				});
			}
		}
		/** @type {Promise<{key: string}>[]} */
		const tasks = [];
		for (const file of files) {
			const data = new FormData();
			data.append("file", file);
			const task = fetch(endpoint, {
				method: "POST",
				headers: { Authorization: auth },
				body: data,
				credentials: "include",
			}).then((res) => {
				if (res.status < 200 || res.status > 204)
					throw new Error(`[${res.status}] ${res.statusText}`);
				done++;
				return res.json();
			});
			tasks.push(task);
		}
		p = Promise.all(tasks)
			.then((data) => dispatch("success", data))
			.catch((error) => dispatch("failure", { error }))
			.finally(() => (done = 0));
	}
</script>

<label class={$$props.class}>
	{#await p}
		<svg
			class="animate-spin mr-3 h-4 w-4"
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
		<slot name="pending">Uploading ({done}/{files.length})</slot>
	{:then _}
		<slot>Choose files</slot>
	{/await}
	<input
		bind:files
		on:change={__change}
		type="file"
		class="hidden"
		{multiple}
		{accept}
	/>
</label>
