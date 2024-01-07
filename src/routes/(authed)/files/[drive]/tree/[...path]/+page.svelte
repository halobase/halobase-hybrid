<script>
  import Layout from "./Layout.svelte";
  import List from "./List.svelte";
  import New from "./New.svelte";
  import Property from "./Property.svelte";
  import Upload from "./Upload.svelte";
  import Drive from "./Drive.svelte";

  export let data;

  /**
   * @typedef {"file" | "folder" | undefined} Mode
   * @typedef {import("$lib/types").File} File
   */

  $: drives = data.drives;
  $: files = data.files;
  $: drive = data.drive;
  $: path = data.path;
  $: crumbs = path ? path.split("/") : [];

  /** @type {Mode} */
  let mode;
  let enable = false; // opens dialog

  /** @type {File} */
  let file;
  let open = false; // opens sidebar

  /** @param {CustomEvent<Mode>} e */
  function __change(e) {
    mode = e.detail;
    enable = true;
  }

  /** @param {CustomEvent<File>} e */
  function __open(e) {
    file = e.detail;
    open = true;
  }
</script>

<Layout bind:open>
  <header class="flex items-center justify-between gap-4">
    <ul class="breadcrumbs">
      <li>
        <Drive {drive} {drives} />
      </li>
      {#each crumbs as crumb, i}
        {@const href = `/files/${drive}/${crumbs.slice(0, i + 1).join("/")}`}
        <li><a class="btn btn-ghost" {href}>{crumb}</a></li>
      {/each}
    </ul>
    <New on:change={__change} />
  </header>
  <List {drive} {files} on:open={__open} />
  <Upload {path} {mode} bind:enable />
  <svelte:fragment slot="sidebar">
    <Property {file} />
  </svelte:fragment>
</Layout>


