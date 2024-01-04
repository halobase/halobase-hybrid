<script>
  import { Confirm } from "$lib";

  /** @type {import("$lib/types").File} */
  export let file;

  let enable = false;
</script>

<button class="btn btn-error" type="button" on:click={() => (enable = true)}>
  Delete
</button>

<Confirm bind:enable color="error" action="?/delete" title="Confirm to delete">
  <p class="card card-error text-sm" slot="extra">
    Sure to delete file
    <span class="badge">{file?.name}</span> ? This operation can
    <strong>NOT</strong>
    be undone.
  </p>
  <input class="hidden" type="text" value={file?.id} />
</Confirm>
