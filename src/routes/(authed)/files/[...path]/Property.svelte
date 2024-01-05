<script>
  import { Clipboard, Form } from "$lib";
  import { iec80000_bytes, locale_datetime } from "$lib/misc/format";
  import Delete from "./Delete.svelte";
  import Preview from "./Preview.svelte";
  import URL from "./URL.svelte";

  /** @type {import("$lib/types").File} */
  export let file;
</script>

<div class="flex flex-col gap-6">
  <div class="intro">
    <Preview {file} />
  </div>
  <div class="intro">
    <h3>Name & Extension</h3>
    <Form action="?/update" direction="row">
      <input class="hidden" type="text" name="id" value={file?.id} />
      <input
        class="input"
        type="text"
        name="name"
        value={file?.name}
        autocomplete="off"
      />
      <svelte:fragment slot="submit">Rename</svelte:fragment>
    </Form>
  </div>
  <div class="intro">
    <h3>Properties</h3>
    <div class="list">
      <ul>
        <li>ID:</li>
        <li>Type:</li>
        <li>Size:</li>
        <li>ETag:</li>
      </ul>
      <ul>
        <li>
          <Clipboard size="tight" value={file?.id} />
        </li>
        <li>{file?.mime_type || "folder"}</li>
        <li>{iec80000_bytes(file?.size)}</li>
        <li>{file?.etag || "-"}</li>
      </ul>
    </div>
    <hr />
    <div class="list">
      <ul>
        <li>Created:</li>
        <li>Updated:</li>
        <li>Accessed:</li>
      </ul>
      <ul>
        <li>{locale_datetime(file?.created_at)}</li>
        <li>{locale_datetime(file?.updated_at)}</li>
        <li>{locale_datetime(file?.accessed_at)}</li>
      </ul>
    </div>
  </div>
  <div class="flex justify-end gap-4">
    {#if file?.mime_type}<URL {file} />{/if}
    <Delete {file} />
  </div>
</div>
