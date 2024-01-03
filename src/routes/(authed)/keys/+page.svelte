<script>
  import { Clipboard, Dialog, Form } from "$lib";
  import List from "./List.svelte";

  export let data;

  $: keys = data.keys;
  let enable = false;
  let created = "";

  function __toggle() {
    enable = !enable;
  }

  /** @param {CustomEvent<typeof keys[0]>} e  */
  function __create(e) {
    const key = e.detail;
    created = `hk-${key.id.slice(4, key.id.length)}.${key.secret}`;
    __toggle();
  }
</script>

<div class="container container-col">
  <div class="flex flex-col justify-between gap-6 md:flex-row">
    <div class="intro intro-2xl">
      <h2>API Keys</h2>
      <p>API keys can be used to authenticate applications.</p>
      <p>
        HaloBase does not save your API keys in plain text, so you have to
        generate new API keys if losing any, and applications using the lost key
        has to be updated as well. Learn more about the
        <a
          class="underline"
          href="https://en.wikipedia.org/wiki/API_key"
          target="_blank"
          rel="noopener noreferrer">API key</a
        >
      </p>
    </div>
    <div>
      <button class="btn btn-alpha" type="button" on:click={__toggle}>
        New API Key
      </button>
    </div>
  </div>
  {#if created}
    <div class="card card-info p-4">
      <p>Successfully generated a new API key!</p>
      <p>
        Please copy the API key at once, you will NOT be enable to see it again,
        and have to generate a new one if losing it.
      </p>
      <div class="py-1"></div>
      <Clipboard value={created} />
    </div>
  {/if}
  <List {keys} />
</div>

<Dialog bind:enable title="Generate API key">
  <p class="text-sm mb-3"></p>
  <Form action="?/create" on:success={__create}>
    <label>
      <p>Purpose of this key.</p>
      <input
        class="input"
        type="text"
        name="name"
        value="Secret Key"
        required
      />
    </label>
    <label>
      <p>Scopes this key has access to.</p>
      <select class="select" name="scope" multiple>
        <option value="file.read">file.read</option>
        <option value="file.write">file.write</option>
        <option value="file.delete">file.delete</option>
      </select>
    </label>
  </Form>
</Dialog>
