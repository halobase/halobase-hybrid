<script>
  /**
   * @type {{
   *   name: string,
   *   options: {
   *     name: string,
   *     value: string,
   *     checked: boolean,
   *   }[]
   * }}
   */
  export let group;
  export let pick_all = false;
</script>

<div>
  <div class="flex gap-2 items-center justify-between mb-2">
    <h5 class="text-intro capitalize">{group.name}</h5>
    <label class="text-intro">
      Pick all
      <input class="checkbox ml-1" type="checkbox" bind:checked={pick_all} />
    </label>
  </div>
  {#if group.options.length > 0}
    <div class="grid sm:grid-cols-2 gap-2">
      {#each group.options as { name, value, checked }, i}
        <label class="card flex gap-2 cursor-pointer">
          <input
            class="checkbox"
            type="checkbox"
            checked={pick_all || checked}
            {name}
            {value}
          />
          <slot {i} />
        </label>
      {/each}
    </div>
  {:else}
    <div class="center h-24">No options.</div>
  {/if}
</div>
