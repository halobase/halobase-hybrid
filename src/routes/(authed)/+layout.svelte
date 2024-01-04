<script>
  import { Header, Sidebar, SidebarApp } from "$lib";
  import Session from "./Session.svelte";
  export let data;
  const { slugs, session } = data;
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
      <div>
        <Session {session} />
        <footer class="px-4 py-2 text-sm">
          <p>©️ HaloBase 2024</p>
        </footer>
      </div>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <svelte:fragment slot="route">
    <slot />
  </svelte:fragment>
</SidebarApp>
