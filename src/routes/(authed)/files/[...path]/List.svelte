<script>
  import { iec80000_bytes, locale_datetime } from "$lib/misc/format";
  import { createEventDispatcher } from "svelte";
    import Link from "./Link.svelte";

  /** @type {import("$lib/types").File[]} */
  export let files;

  const dispatch = createEventDispatcher();
</script>

<div class="card card-nopad overflow-x-auto">
  <table class="table table-outline table-nowrap">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th class="cell-md">Size</th>
        <th class="cell-lg">Type</th>
        <th class="cell-xl">Created</th>
        <th class="cell-2xl">Accessed</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each files as file}
        <tr>
          <td>{file.mime_type ? "📄" : "📁"}</td>
          <td>
            <Link {file} />
          </td>
          <td class="cell-md">{iec80000_bytes(file.size)}</td>
          <td class="cell-lg">{file.mime_type || "-"}</td>
          <td class="cell-xl">{locale_datetime(file.created_at)}</td>
          <td class="cell-2xl">{locale_datetime(file.accessed_at)}</td>
          <td class="py-0">
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
</div>
