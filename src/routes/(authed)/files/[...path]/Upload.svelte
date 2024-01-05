<script>
  import { Dialog, FileInput, Form } from "$lib";
  import { iec80000_bytes } from "$lib/misc/format";

  /** @type {string} */
  export let path;
  /** @type {"file" | "folder"} */
  export let mode = "folder";

  export let enable = false;

  /**
   * @typedef {Pick<
   *   import("$lib/types").File,
   *   "name" | "etag" | "mime_type" | "size"
   * >} File
   */

  /** @type {File=} */
  let file;

  /** @param {CustomEvent<File[]>} e */
  async function __upload(e) {
    file = e.detail[0];
  }
</script>

<Dialog bind:enable title="New {mode}">
  <Form action="?/create" disabled={!file} on:success={() => (enable = false)}>
    <p class="text-sm mb-3">
      Creating a new {mode} under
      <span class="badge">/{path}</span>
    </p>
    {#if mode === "folder"}
      <input class="input" type="text" name="name" value="Untitled Folder" />
    {:else}
      <FileInput
        class="btn btn-beta"
        endpoint="/api/s3"
        on:success={__upload}
      />
      {#if file}
        <p class="card flex justify-between">
          <span>{file.name}</span>
          <span>{iec80000_bytes(file.size)}</span>
        </p>
      {/if}
      <div class="flex justify-between">
        <p>Make this file accessable to everyone.</p>
        <input class="switch switch-alpha" type="checkbox" name="public" />
      </div>
      <input class="hidden" type="text" name="name" value={file?.name} />
      <input class="hidden" type="number" name="size" value={file?.size} />
      <input class="hidden" type="text" name="etag" value={file?.etag} />
      <input
        class="hidden"
        type="text"
        name="mime_type"
        value={file?.mime_type}
      />
    {/if}
  </Form>
</Dialog>
