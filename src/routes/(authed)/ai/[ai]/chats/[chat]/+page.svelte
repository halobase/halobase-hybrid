<script>
  import List from "./List.svelte";

  function __send() {}
</script>

<div class="flex flex-col justify-between w-full overflow-hidden">
  <List />
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
