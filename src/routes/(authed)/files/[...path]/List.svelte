<script>
  import { iec80000_bytes, locale_datetime } from "$lib/misc/format";
  import { createEventDispatcher } from "svelte";

  /** @type {import("$lib/types").File[]} */
  export let files;

  const dispatch = createEventDispatcher();
</script>

<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Size</th>
        <th>Type</th>
        <th>Created</th>
        <th>Accessed</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each files as file}
        <tr>
          <td>{file.mime_type ? "📄" : "📁"}</td>
          <td>
            {#if file.mime_type}
              {file.name}
            {:else}
              {@const href = `/files/${file.path ? file.path + "/" : ""}${
                file.name
              }`}
              <a class="hover:underline" {href}>{file.name}</a>
            {/if}
          </td>
          <td>{iec80000_bytes(file.size)}</td>
          <td>{file.mime_type || "-"}</td>
          <td>{locale_datetime(file.created_at)}</td>
          <td>{locale_datetime(file.accessed_at)}</td>
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
