<script>
  import { FileInput, Form } from "$lib";

  /** @type {string} */
  export let path;
  /** @type {"file" | "folder"} */
  export let mode = "folder";
</script>

<p class="text-sm mb-3">
  You are creating a new {mode} under
  <span class="badge">/{path}</span>
</p>
<Form action="?/create" on:success>
  {#if mode === "folder"}
  <label>
    <input class="input" type="text" name="name" value="Untitled Folder" />
  </label>
  {:else}
    <FileInput class="btn btn-beta" endpoint="/api/files" />
  {/if}
</Form>
