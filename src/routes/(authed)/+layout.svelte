<script>
  import { Header, Sidebar, SidebarApp } from "$lib";
  export let data;
  const { slugs } = data;
</script>

<SidebarApp>
  <svelte:fragment slot="brand">
    <a class="btn btn-ghost" href="/">
      <h1 class="font-bold text-xl">HaloBase</h1>
    </a>
  </svelte:fragment>
  <svelte:fragment slot="sidebar">
    <div class="h-full flex flex-col justify-between">
      <Sidebar {slugs} />
      <footer class="p-2 text-sm">
        <p>©️ HaloBase 2024</p>
      </footer>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <svelte:fragment slot="route">
    <slot />
  </svelte:fragment>
</SidebarApp>
