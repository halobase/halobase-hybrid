<script>
  import { iec80000_bytes, locale_datetime } from "$lib/misc/format";
  import { createEventDispatcher } from "svelte";
  import Link from "./Link.svelte";

  /** @type {import("$lib/types").File[]} */
  export let files;
  /** @type {import("$lib/types").Drive} */
  export let drive;
  /** @type {string} */
  export let path;

  const dispatch = createEventDispatcher();
</script>

<div class="card card-nopad overflow-x-auto">
  <table class="table table-outline table-nowrap table-fixed">
    <thead>
      <tr>
        <th class="w-12"></th>
        <th>Name</th>
        <th class="cell-md w-24">Size</th>
        <th class="cell-lg w-60">Type</th>
        <th class="cell-xl w-48">Created</th>
        <th class="cell-2xl w-48">Accessed</th>
        <th class="w-14"></th>
      </tr>
    </thead>
    <tbody>
      {#each files as file}
        <tr>
          <td class="w-12">{file.mime_type ? "📄" : "📁"}</td>
          <td class="text-ellipsis">
            <Link {drive} {file} {path} />
          </td>
          <td class="cell-md w-24">{iec80000_bytes(file.size, 1, true)}</td>
          <td class="cell-lg w-60">{file.mime_type || "-"}</td>
          <td class="cell-xl w-48">{locale_datetime(file.created_at)}</td>
          <td class="cell-2xl w-48">{locale_datetime(file.accessed_at)}</td>
          <td class="py-0 w-14">
            <button
              class="btn btn-square btn-ghost btn-xs w-6 h-6"
              type="button"
              on:click={() => dispatch("open", file)}
            >
              ···
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  {#if files.length === 0}
    <div class="center h-20 text-sm">Empty</div>
  {/if}
</div>
