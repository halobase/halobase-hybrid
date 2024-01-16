<script>
  import { onMount } from "svelte";

  /** @type {string} */
  export let endpoint;
  export let group = "smileys";
  export let name = "icon";

  /** @type {Promise<string>} */
  let p;

  async function __fetch() {
    p = fetch(`${endpoint}/${group}/random`).then((res) => res.text());
  }

  onMount(__fetch);
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="w-12">
  {#await p}
    <svg
      class="animate-spin h-4 w-4 text-back"
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
  {:then value}
    <input
      class="input input-center px-0"
      type="text"
      {name}
      {value}
      placeholder="Face"
    />
  {/await}
</label>
