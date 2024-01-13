<script>
  import { Dialog, Form } from "$lib";

  /** @type {import("$lib/types").File} */
  export let file;

  let enable = false;
</script>

<button class="btn" type="button" on:click={() => (enable = true)}>
  Get URL
</button>

<Dialog bind:enable title="Get URL">
  <Form action="?/share">
    <p>
      Creating public URL for 
      <span class="badge">{file?.name}</span>
    </p>
    <div>
      <h3>Time to live</h3>
      <div class="flex gap-2">
        <input class="input" type="number" name="value" value={60} />
        <select class="select w-5/12 sm:w-5/12" name="unit">
          <option value="m">minute</option>
          <option value="h">hour</option>
          <option value="d">day</option>
        </select>
      </div>
    </div>
    <input class="hidden" type="text" value={file?.id} />
  </Form>
</Dialog>
