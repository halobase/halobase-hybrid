<script>
  import { Dialog, Form } from "$lib";
    import List from "./List.svelte";

  export let data;

  $: drives = data.drives;

  let enable = false;

  function __toggle() {
    enable = !enable;
  }
</script>

<svelte:head>
  <title>Files - HaloBase</title>
</svelte:head>

<div class="container container-lg">
  <header class="card-wrap gap-2">
    <div class="intro intro-2xl">
      <h2>Drives</h2>
      <p>Drives saves your files in logically separate disks.</p>
      <p>Each drive can be configured with different access permissions 
        and a fixed number of disk spaces. Click the "Add Drive" button
        to add a new drive to your account.
      </p>
    </div>
    <div>
      <button class="btn btn-alpha" type="button" on:click={__toggle}>
        Add Drive
      </button>
    </div>
  </header>
  <List {drives} />
</div>

<Dialog bind:enable title="Add Drive">
  <Form action="?/create" on:success={__toggle}>
    <label>
      <input
        class="input"
        type="text"
        name="name"
        placeholder="Drive Name"
        required
      />
    </label>
    <fieldset class="card px-4">
      <legend>Disk space to allocate</legend>
      <label>
        <input
          class="range"
          type="range"
          name="total"
          min="0"
          max="3"
          step="1"
          value="0"
        />
        <div class="flex justify-between text-sm mt-1">
          <span>50M</span>
          <span>500M</span>
          <span>5G</span>
          <span>50G</span>
        </div>
      </label>
    </fieldset>
    <ul class="list list-fill">
      <li>
        <h4>Read only</h4>
        <input class="switch switch-alpha" type="checkbox" name="readonly" />
      </li>
    </ul>
  </Form>
</Dialog>
