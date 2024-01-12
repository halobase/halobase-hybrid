<script>
  import Layout from "./Layout.svelte";
  import List from "./List.svelte";
  import New from "./New.svelte";
  import Property from "./Property.svelte";
  import Upload from "./Upload.svelte";
  import Menu from "./Menu.svelte";
  import Drive from "./Drive.svelte";
  import Task from "./Task.svelte";

  /** @type {import("./$types").PageData} */
  export let data;

  /**
   * @typedef {"file" | "folder" | undefined} Mode
   * @typedef {import("$lib/types").File} File
   */

  $: drives = data.drives;
  $: files = data.files;
  $: node = data.node;
  $: drive = data.drive;
  $: path = data.path;
  $: stats = data.stats;
  $: crumbs = data.crumbs;

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

<svelte:head>
  <title>{drive?.name} - HaloBase</title>
</svelte:head>

<Layout bind:open>
  {#if drive}
    <header class="flex justify-between gap-4 items-center">
      <ul class="breadcrumbs">
        <li>
          <Menu {drive} {drives} />
        </li>
        {#each crumbs as crumb, i}
          {@const href = `/drives/${drive.slug}/tree/${crumbs.slice(0, i + 1).join("/")}`}
          <li><a class="btn btn-ghost" {href}>{crumb}</a></li>
        {/each}
      </ul>
      <div class="flex gap-4">
        <New on:change={__change} />
      </div>
    </header>
    <div class="grow">
      <List {drive} {files} {path} on:open={__open} />
    </div>
    <div class=" justify-self-end">
      {#if stats}
      <Drive {stats} {drive} />
    {/if}
    </div>
  {:else}
    <div class="center h-80">No such drive found</div>
  {/if}
  <Upload {path} {mode} {node} bind:enable />
  <svelte:fragment slot="sidebar">
    <Property {file} {path} {drive} />
  </svelte:fragment>
</Layout>
