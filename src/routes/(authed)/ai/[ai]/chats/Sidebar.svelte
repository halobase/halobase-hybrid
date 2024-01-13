<script>
  import { goto } from "$app/navigation";
  import { Form } from "$lib";
  import List from "./List.svelte";

  /** @type {import("$lib/types").AI} */
  export let ai;
  /** @type {import("$lib/types").Chat[]} */
  export let chats;

  /** @param {CustomEvent<import("$lib/types").Chat>} e  */
  async function __create(e) {
    await goto(`/ai/${ai.slug}/chats/${e.detail.id}`);
  }
</script>

<div class="flex flex-col gap-4 w-72 h-full p-4 overflow-y-hidden">
  <Form action="/ai/{ai.slug}/chats?/create" color="unset" align="full" on:success={__create}>
    <svelte:fragment slot="submit">New Chat</svelte:fragment>
  </Form>
  <List {ai} {chats} />
</div>
