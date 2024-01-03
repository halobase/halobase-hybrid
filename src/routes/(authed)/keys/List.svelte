<script>
  import { Confirm } from "$lib";
  import { locale_datetime } from "$lib/misc/format";

  /** @type {import("$lib/types").Key[]} */
  export let keys;

  /** @type {typeof keys[0]} */
  let dying;
  let enable = false;

  /** @param {typeof keys[0]} key  */
  function format(key) {
    if (!key) return "";
    return `hk-${key.id.slice(4, 8)}************${key.secret_masked}`;
  }

  function __delete() {
    enable = false;
  }
</script>

<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>Key</th>
        <th>Name</th>
        <th>Accessed</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each keys as key}
        <tr>
          <td>{format(key)}</td>
          <td>{key.name}</td>
          <td>{key.accessed_at ? locale_datetime(key.accessed_at) : "-"}</td>
          <td>
            <button
              class="btn btn-ghost btn-error btn-xs"
              type="button"
              on:click={() => {
                dying = key;
                enable = true;
              }}
            >
              Revoke
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<Confirm
  color="error"
  action="?/delete"
  title="Confirm to revoke"
  bind:enable
  on:success={__delete}
>
  <p class="card card-error text-sm" slot="extra">
    Sure to revoke <span class="badge">{format(dying)}</span> ? 
    This operation can NOT be undone.
  </p>
  <input class="hidden" type="text" name="id" value={dying?.id}>
</Confirm>
