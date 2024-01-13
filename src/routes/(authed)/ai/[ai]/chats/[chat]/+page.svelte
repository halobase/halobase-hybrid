<script>
  import List from "./List.svelte";

  export let data;

  $: ai = data.ai;
  $: user = data.session.user;

  /** @type {Pick<import("$lib/types").Message, "role" | "text">[]} */
  const msgs = [
    {
      role: "ai",
      text: "Hello, how can I assist you today?"
    },
    {
      role: "user",
      text: "No thanks"
    },
    {
      role: "ai",
      text: "Well, let me know if there's anything I can help."
    }
  ];

  function __send() {}
</script>

<div class="flex flex-col justify-between h-full overflow-hidden">
  <List {ai} {user} {msgs} />
  <form on:submit|preventDefault={__send} class="block pb-2 sm:pb-4">
    <div class="flex justify-between py-2">
      <div></div>
      <button class="btn btn-alpha" type="submit">Send</button>
    </div>
    <textarea
      class="input h-9 sm:h-20 lg:h-24"
      placeholder={`Press the "Send" button to send your message.`}
    ></textarea>
  </form>
</div>
