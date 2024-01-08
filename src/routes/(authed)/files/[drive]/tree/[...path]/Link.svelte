<script>
  /** @type {import("$lib/types").File} */
  export let file;
  /** @type {import("$lib/types").Drive} */
  export let drive;
</script>

{#if file.mime_type}
  {file.name}
{:else}
  {@const href = `/files/${drive.slug}/tree/${file.path? file.path+"/" : ""}${file.name}`}
  <a class="hover:underline" {href}>{file.name}</a>
{/if}
