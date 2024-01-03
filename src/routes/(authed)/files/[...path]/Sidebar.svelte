<script>
  /** @type {import("$lib/types").File} */
  export let file;
</script>

{#if file}
  {file.name}
{/if}
