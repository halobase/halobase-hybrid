<script>
  import { colors } from "./colors";

  /**
   * @type {{
   *   total: number,
   *   items: {
   *     key: string,
   *     value: number,
   *   }[]
   * }}
   */
  export let stats;
</script>

<div class="progress flex w-full h-4 rounded-full bg-fore bg-opacity-10">
  {#each stats.items as item, i}
    {@const w = item.value / stats.total}
    <span
      class="h-full cursor-pointer"
      style="width: {100 * w}%; background-color: {colors[i % colors.length]}"
      title={item.key}
    />
  {/each}
</div>
