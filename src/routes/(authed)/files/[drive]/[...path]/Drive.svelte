<script>
  import { Dialog, Form } from "$lib";

  /** @type {string} */
  export let drive;
  /** @type {import('$lib/types.js').Drive[]} */
  export let drives;

  let enable = false;

  function __toggle() {
    enable = !enable;
  }
</script>

<div class="details">
  <div class="summary btn btn-ghost" tabindex="0" role="button">{drive}</div>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <nav class="card card-fill menu text-sm" tabindex="0">
    <ul>
      {#each drives as dv}
        <li>
          <a
            class="flex justify-between min-w-36"
            class:active={dv.name === drive}
            href="/files/{dv.name}"
          >
            <span>{dv.name}</span>
            <span>{Math.ceil((dv.used / dv.total) * 100)}%</span>
          </a>
        </li>
      {/each}
    </ul>
    <button
      class="btn btn-light btn-sm mt-2 w-full"
      type="button"
      on:click={__toggle}
    >
      Add Drive
    </button>
  </nav>
</div>

<Dialog bind:enable title="Add Drive">
  <Form>
    <label>
      <input class="input" type="text" name="name" placeholder="Drive Name" required />
    </label>
    <fieldset class="card px-4">
      <legend>Disk space to allocate</legend>
      <label>
        <input
          class="range"
          type="range"
          name="total"
          min="1"
          max="4"
          step="1"
          value="1"
        />
        <div class="flex justify-between text-sm mt-1">
          <span>5M</span>
          <span>50M</span>
          <span>500M</span>
          <span>1G</span>
        </div>
      </label>
    </fieldset>
  </Form>
</Dialog>
