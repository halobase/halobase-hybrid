<script>
  import { Clipboard, Form } from "$lib";
  import { iec80000_bytes, locale_datetime } from "$lib/misc/format";
  import Delete from "./Delete.svelte";
  import Preview from "./Preview.svelte";
  import URL from "./URL.svelte";

  /** @type {import("$lib/types").File} */
  export let file;
  /** @type {import("$lib/types").Drive} */
  export let drive;
  /** @type {string} */
  export let path;
</script>

<div class="flex flex-col gap-4 sm:gap-6">
  <div class="intro">
    <Preview {file} />
  </div>
  <div class="intro">
    <h3>Name</h3>
    <Form action="?/move" direction="row">
      <input class="hidden" type="text" name="from" value={file?.name} />
      <input
        class="input"
        type="text"
        name="to"
        autocomplete="off"
        value={file?.name}
      />
      <svelte:fragment slot="submit">Rename</svelte:fragment>
    </Form>
  </div>
  <div class="intro">
    <h3>Properties</h3>
    <ul class="list list-fill mb-4">
      <li>
        <h4>ID</h4>
        <Clipboard style="badge" value={file?.id} />
      </li>
      <li>
        <h4>Type</h4>
        <span>{file?.mime_type || "folder"}</span>
      </li>
      <li>
        <h4>Size</h4>
        <span>{iec80000_bytes(file?.size)}</span>
      </li>
      <li>
        <h4>Path</h4>
        <Clipboard style="plain" value={`/drives/${drive.slug}/tree/${path}${file?.name}`} />
      </li>
    </ul>
    <ul class="list list-fill">
      <li>
        <h4>Created</h4>
        <span>{locale_datetime(file?.created_at)}</span>
      </li>
      <li>
        <h4>Updated</h4>
        <span>{locale_datetime(file?.updated_at)}</span>
      </li>
    </ul>
  </div>
  <div class="flex justify-end gap-4">
    {#if file?.mime_type}<URL {file} />{/if}
    <Delete {file} />
  </div>
</div>
