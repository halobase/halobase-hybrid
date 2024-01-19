<script>
  import List from "./List.svelte";
  import Input from "./Input.svelte";
  export let data;

  $: ai = data.ai;
  $: chat = data.chat;
  $: user = data.session.user;

  let disabled = false;

  /** @type {Pick<import("$lib/types").Message, "role" | "content">[]} */
  let msgs = [];

  /** @param {CustomEvent<import("$lib/types").Message>} e */
  function __close(e) {
    msgs = [...msgs, e.detail];
    disabled = false;
  }

  /** @param {CustomEvent<import("$lib/types").Message>} e */
  function __submit(e) {
    disabled = true;
    msgs = [...msgs, e.detail];
  }
</script>

<div class="flex flex-col justify-between h-full overflow-hidden">
  <List {ai} {chat} {user} {msgs} on:close={__close} />
  <Input on:submit={__submit} />
</div>
