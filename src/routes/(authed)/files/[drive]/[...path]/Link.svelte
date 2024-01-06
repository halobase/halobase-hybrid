<script>
  /** @type {import("$lib/types").File} */
  export let file;
  /** @type {string} */
  export let drive;
</script>

{#if file.mime_type}
  {#if file.public}
    {@const href = `/files/public/${file.path? file.path+"/" : ""}/${file.name}`}
    <a class="hover:underline" {href}>{file.name}</a>
  {:else}
    {file.name} 🔒
  {/if}
{:else}
  {@const href = `/files/${drive}/${file.path? file.path+"/" : ""}${file.name}`}
  <a class="hover:underline" {href}>{file.name}</a>
{/if}
