<script>
  import Header from "./Header.svelte";
  import Sidebar from "./Sidebar.svelte";

  export let data;
  $: ai = data.ai;
  $: chats = data.chats;
</script>

<div class="drawer drawer-r drawer-s-xl">
  <input type="checkbox" id="chat" />
  <main class="container container-xl py-0">
    <Header {ai} {chats} />
    <slot />
  </main>
  <aside>
    <label for="chat"></label>
    <Sidebar {ai} {chats} />
  </aside>
</div>
