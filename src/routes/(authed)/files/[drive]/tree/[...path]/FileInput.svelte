<script>
  import { hex } from "$lib/misc/encoding";
  import { iec80000_bytes } from "$lib/misc/format";
  import { createEventDispatcher } from "svelte";

  /** @type {"SHA-1" | "SHA-256" | "SHA-512" | ""} */
  export let digest = "";
  export let name = "file";

  const dispatch = createEventDispatcher();

  /**
   * @typedef {EventTarget & {
   *   files : FileList
   * }} FileEventTarget
   */

  /** @type {File} */
  let file;
  /** @type {string} */
  let hash;

  let exists = false;
  let error = "";

  /** @param {Event} e  */
  async function __change(e) {
    file = /** @type {FileEventTarget} */ (e.target)?.files[0];

    const too_large = file.size > 10 * 1024 * 1024;
    error = too_large ? "File must be smaller than 10MiB." : "";
    if (too_large) {
      return;
    }

    if (digest) {
      hash = hex(await crypto.subtle.digest(digest, await file.arrayBuffer()));
      const { status } = await fetch(`/api/digest/${hash}`);
      switch (status) {
        case 200:
          exists = true;
          break;
        case 204:
          break;
        default:
          error = "Unexpected error occurred.";
          return;
      }
    }
    dispatch("change", { file, hash });
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
