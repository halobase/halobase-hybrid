<script>
  import { Confirm } from "$lib";

  /** @type {import("$lib/types").File} */
  export let file;

  let enable = false;

  function __toggle() {
    enable = !enable;
  }
</script>

<button class="btn btn-error" type="button" on:click={__toggle}>
  Delete
</button>

<Confirm
  bind:enable
  color="error"
  action="?/delete"
  title="Confirm to delete"
  on:success={__toggle}
>
  <p class="card card-error text-sm" slot="extra">
    Sure to delete file
    <span class="badge">{file?.name}</span> ? This operation can
    <strong>NOT</strong>
    be undone.
  </p>
  <input class="hidden" type="text" name="name" value={file?.name} />
</Confirm>
