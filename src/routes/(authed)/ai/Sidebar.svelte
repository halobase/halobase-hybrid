<script>
  import { Dialog, Form, RandomFacePicker } from "$lib";
  import { debounce } from "$lib/misc/algorithm";
  import List from "./List.svelte";
  /** @type {import("$lib/types").AI[]} */
  export let ais;

  let enable = false;

  function __toggle() {
    enable = !enable;
  }

  $: ais_filtered = ais;

  /** @param {{ target: { value: string } }} e */
  function __input(e) {
    ais_filtered = ais.filter(function (v) {
      const k = e.target.value.toLowerCase();
      return k ? v.name.toLowerCase().includes(k) : true;
    });
  }

</script>

<div class="flex flex-col gap-4 p-4 h-full w-72 2xl:w-80 overflow-y-hidden">
  <div class="flex gap-2">
    <input
      class="input w-full"
      type="text"
      placeholder="Search Assistant"
      on:input={debounce(__input, 250)}
    />
    <button class="btn btn-alpha w-1/4" type="button" on:click={__toggle}>
      Add
    </button>
  </div>
  <List ais={ais_filtered} />
</div>

<Dialog bind:enable title="Add AI">
  <Form action="/ai?/create" on:success={__toggle}>
    <div class="group">
      <p>🆔 Name the AI assistant.</p>
      <div class="flex gap-2">
        <label class="w-full">
          <input class="input" type="text" name="name" placeholder="AI Name" />
        </label>
        <RandomFacePicker endpoint="/api/icons" />
      </div>
    </div>
    <label>
      <p>🌈 Describe what you'd like the AI assistant to be.</p>
      <textarea
        class="input"
        name="system_prompt"
        rows="3"
        value="You are a helpful AI assistant."
      ></textarea>
    </label>
    <svelte:fragment slot="submit">Add</svelte:fragment>
  </Form>
</Dialog>
