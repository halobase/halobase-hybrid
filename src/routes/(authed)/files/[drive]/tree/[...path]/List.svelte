<script>
  import { iec80000_bytes, locale_datetime } from "$lib/misc/format";
  import { createEventDispatcher } from "svelte";
  import Link from "./Link.svelte";

  /** @type {import("$lib/types").File[]} */
  export let files;
  /** @type {string} */
  export let drive;

  const dispatch = createEventDispatcher();
</script>

<div class="card card-nopad overflow-x-auto">
  <table class="table table-outline table-nowrap table-fixed">
    <thead>
      <tr>
        <th class="w-12"></th>
        <th>Name</th>
        <th class="cell-md w-24">Size</th>
        <th class="cell-lg w-56">Type</th>
        <th class="cell-xl w-44">Created</th>
        <th class="cell-2xl w-44">Accessed</th>
        <th class="w-14"></th>
      </tr>
    </thead>
    <tbody>
      {#each files as file}
        <tr>
          <td class="w-12">{file.mime_type ? "📄" : "📁"}</td>
          <td class="text-ellipsis">
            <Link {drive} {file} />
          </td>
          <td class="cell-md w-24">{iec80000_bytes(file.size)}</td>
          <td class="cell-lg w-56">{file.mime_type || "-"}</td>
          <td class="cell-xl w-44">{locale_datetime(file.created_at)}</td>
          <td class="cell-2xl w-44">{locale_datetime(file.accessed_at)}</td>
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
