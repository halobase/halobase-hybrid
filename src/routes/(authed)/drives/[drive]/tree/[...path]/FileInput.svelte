<script>
  import { MiB } from "$lib/misc/consts";
  import { to_hex } from "$lib/misc/encoding";
  import { iec80000_bytes } from "$lib/misc/format";
  import { createEventDispatcher } from "svelte";

  export let name = "file";

  const dispatch = createEventDispatcher();

  /**
   * @typedef {EventTarget & {
   *   files : FileList
   * }} FileEventTarget
   */

  /** @type {File?} */
  let file = null;
  /** @type {string} */
  let hash;

  let exists = false;
  let error = "";

  /** @param {Event} e  */
  async function __change(e) {
    file = /** @type {FileEventTarget} */ (e.target)?.files[0];

    const too_large = file.size > 5 * MiB;
    error = too_large ? "File must be smaller than 10MiB." : "";
    if (too_large) {
      return;
    }

    hash = to_hex(
      await crypto.subtle.digest("sha-1", await file.arrayBuffer()),
    );
    const res = await fetch("/api/legacy/blobs", {
      method: "POST",
      body: JSON.stringify({
        size: file.size,
        hash,
      }),
    });
    switch (res.status) {
      case 409:
        exists = true;
        break;
      case 201:
        break;
      default:
        error = "Unexpected error occurred.";
        return;
    }
    /** @type {import("$lib/types").Blob} */
    const blob = await res.json();
    dispatch("change", {
      file,
      hash,
      blob: blob.id,
      done: () => {
        file = null;
      },
    });
  }
</script>

<label class="card card-dashed cursor-pointer">
  {#if file}
    <div class="flex justify-between">
      <span class="overflow-x-hidden">{file.name}</span>
      <span class="badge">{iec80000_bytes(file.size)}</span>
    </div>
    <div class="text-intro text-xs mb-1">
      {file.type || "unknown"}
    </div>
  {:else}
    <div class="center text-sm">
      <span class="py-4">📄 Click or drop a file here</span>
    </div>
  {/if}
  <input
    class="hidden"
    type="file"
    name={exists ? "" : name}
    on:change={__change}
  />
</label>
{#if error}
  <div class="card card-error">{error}</div>
{/if}
