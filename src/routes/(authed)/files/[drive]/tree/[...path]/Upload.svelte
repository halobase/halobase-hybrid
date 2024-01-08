<script>
  import { Dialog, Form } from "$lib";
  import FileInput from "./FileInput.svelte";

  /** @type {string} */
  export let path;
  /** @type {"file" | "folder"} */
  export let mode = "folder";

  export let enable = false;

  /**
   * @typedef {Pick<
   *   import("$lib/types").File,
   *   "name" | "hash" | "mime_type" | "size"
   * >} PickFile
   */

  /** @type {PickFile=} */
  let pick_file;

  /**
   * @param {CustomEvent<{
   *   file: File,
   *   hash: string,
   * }>} e
   */
  async function __change(e) {
    const { file, hash } = e.detail;
    pick_file = {
      name: file.name,
      mime_type: file.type || "unknown",
      size: file.size,
      hash
    };
  }
</script>

<Dialog bind:enable title="New {mode}">
  <Form
    action="?/create"
    enctype="multipart/form-data"
    disabled={mode === "file" && !pick_file}
    reset={true}
    on:success={() => (enable = false)}
  >
    <p class="text-sm">
      Creating a new {mode} under 
      <span class="badge">/{path}</span>
    </p>
    {#if mode === "folder"}
      <input class="input" type="text" name="name" value="Untitled Folder" />
    {:else}
      <FileInput digest="SHA-1" on:change={__change} />
      <fieldset class="card">
        <div class="flex justify-between items-center text-sm">
          <p class="text-intro">Accessable to everyone.</p>
          <input class="switch switch-alpha" type="checkbox" name="public" />
        </div>
      </fieldset>
      <input class="hidden" type="text" name="name" value={pick_file?.name} />
      <input class="hidden" type="number" name="size" value={pick_file?.size} />
      <input class="hidden" type="text" name="hash" value={pick_file?.hash} />
      <input
        class="hidden"
        type="text"
        name="mime_type"
        value={pick_file?.mime_type}
      />
    {/if}
    <svelte:fragment slot="submit">
      {mode === "file"? "Upload" : "Create"}
    </svelte:fragment>
  </Form>
</Dialog>
