<script>
  import Sidebar from "./Sidebar.svelte";
  export let data;
  $: ais = data.ais;
</script>

<svelte:head>
  <title>AI - HaloBase</title>
</svelte:head>

<div class="drawer drawer-l drawer-s-2xl max-w-screen-2xl 2xl:px-8 mx-auto overflow-hidden">
  <input type="checkbox" id="ai" />
  <main>
    <slot />
  </main>
  <aside>
    <label for="ai"></label>
    <Sidebar {ais} />
  </aside>
</div>


