<script>
  /** @type {import("$lib/types").File} */
  export let file;
  /** @type {import("$lib/types").Drive} */
  export let drive;
  /** @type {string} */
  export let path;
</script>

{#if file.mime_type}
  {file.name}
{:else}
  {@const href = `/drives/${drive.slug}/tree/${path ? path + "/" : ""}${file.name}`}
  <a class="hover:underline" {href}>{file.name}</a>
{/if}
