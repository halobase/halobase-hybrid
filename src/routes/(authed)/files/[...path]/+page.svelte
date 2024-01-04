<script>
  import { Dialog } from "$lib";
  import Layout from "./Layout.svelte";
  import List from "./List.svelte";
  import New from "./New.svelte";
  import Property from "./Property.svelte";
  import Upload from "./Upload.svelte";

  export let data;

  /**
   * @typedef {"file" | "folder" | undefined} Mode
   * @typedef {import("$lib/types").File} File
   */

  $: files = data.files;
  $: path = data.path;
  $: crumbs = path ? path.split("/") : [];

  /** @type {Mode} */
  let mode;
  let enable = false;

  /** @type {File} */
  let file;
  let open = false;

  /**
   * @param {string[]} a
   * @param {number} i
   */
  function accumlate(a, i) {
    return a.slice(0, i + 1).join("/");
  }

  function __close() {
    enable = false;
  }

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
  <header class="flex items-center justify-between gap-4 mb-6">
    <ul class="breadcrumbs overflow-x-auto">
      <li><a class="btn btn-ghost btn-sm" href="/files">Home</a></li>
      {#each crumbs as crumb, i}
        {@const href = `/files/${accumlate(crumbs, i)}`}
        <li><a class="btn btn-ghost btn-sm" {href}>{crumb}</a></li>
      {/each}
    </ul>
    <New on:change={__change} />
  </header>
  <List {files} on:open={__open} />
  <svelte:fragment slot="sidebar">
    <Property {file} />
  </svelte:fragment>
</Layout>

<Dialog bind:enable title="New {mode}">
  <Upload {path} {mode} on:success={__close} />
</Dialog>
