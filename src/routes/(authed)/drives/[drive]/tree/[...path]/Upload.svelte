<script>
  import { Dialog, Form } from "$lib";
  import { afterUpdate } from "svelte";
  import FileInput from "./FileInput.svelte";

  /** @type {import("$lib/misc/types").Tree<Pick<import("$lib/types").File, "id">>} */
  export let node;
  /** @type {string} */
  export let path;
  /** @type {"file" | "folder"} */
  export let mode = "folder";

  export let enable = false;

  /**
   * @typedef {Pick<
   *   import("$lib/types").File,
   *   "name" | "mime_type" | "size" | "blob" | "hash"
   * >} PickFile
   */

  /** @type {PickFile?} */
  let pick_file = null;

  /**
   * @param {CustomEvent<{
   *   file: File,
   *   hash: string,
   *   blob: import("$lib/types").Blob,
   * }>} e
   */
  async function __change(e) {
    const { file, hash, blob } = e.detail;
    pick_file = {
      name: file.name,
      mime_type: file.type || "unknown",
      size: file.size,
      blob,
      hash,
    };
  }

  function __upload() {
    pick_file = null;
    enable = false;
  }

  afterUpdate(function () {
    console.log(node);
  });
</script>

<Dialog bind:enable title="New {mode}">
  <Form
    action="?/create"
    enctype="multipart/form-data"
    disabled={mode === "file" && !pick_file}
    reset={true}
    on:success={__upload}
  >
    <p class="text-sm">
      Creating a new {mode} under
      <span class="badge">/{path}</span>
    </p>
    <input class="hidden" type="text" name="parent" value={node.key.id} />
    {#if mode === "folder"}
      <input class="input" type="text" name="name" value="Untitled Folder" />
    {:else}
      <FileInput on:change={__change} />
      <fieldset class="card">
        <div class="flex justify-between items-center text-sm">
          <p class="text-intro">Accessable to everyone.</p>
          <input class="switch switch-alpha" type="checkbox" name="public" />
        </div>
      </fieldset>
      <input class="hidden" type="text" name="name" value={pick_file?.name} />
      <input class="hidden" type="text" name="blob" value={pick_file?.blob} />
      <input class="hidden" type="text" name="hash" value={pick_file?.hash} />
      <input
        class="hidden"
        type="text"
        name="mime_type"
        value={pick_file?.mime_type}
      />
      <input
        class="hidden"
        type="number"
        name="size"
        value={pick_file?.size ?? 0}
      />
    {/if}

    <svelte:fragment slot="submit">
      {mode === "file" ? "Upload" : "Create"}
    </svelte:fragment>
  </Form>
</Dialog>
