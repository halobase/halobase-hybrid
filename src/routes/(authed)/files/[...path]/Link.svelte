<script>
  /** @type {import("$lib/types").File} */
  export let file;
</script>

{#if file.mime_type}
  {#if file.public}
    {@const href = `/s3/${file.path ? file.path + "/" : ""}${file.name}`}
    <a class="hover:underline" {href}>{file.name}</a>
  {:else}
    {file.name} 🔒
  {/if}
{:else}
  {@const href = `/files/${file.path ? file.path + "/" : ""}${file.name}`}
  <a class="hover:underline" {href}>{file.name}</a>
{/if}
