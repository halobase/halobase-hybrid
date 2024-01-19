<script>
  /** @type {string} */
  export let name;
  /** @type {number} */
  export let value;
  export let min = 0;
  export let max = 1;
  export let step = 0.05;
</script>

<label class="flex gap-2 items-center">
  <input
    class="input input-center px-0 w-12 appearance-none"
    type="text"
    bind:value
  />
  <input class="range" type="range" {name} {min} {max} {step} bind:value />
</label>
