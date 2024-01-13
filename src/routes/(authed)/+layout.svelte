<script>
  import { Header, Sidebar, SidebarApp } from "$lib";
  import Copyright from "./Copyright.svelte";
  import Session from "./Session.svelte";
  import Tasks from "./Tasks.svelte";
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
        <Copyright />
      </div>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="header">
    <Header>
      <svelte:fragment slot="right">
        <Tasks />
      </svelte:fragment>
    </Header>
  </svelte:fragment>
  <svelte:fragment slot="route">
    <slot />
  </svelte:fragment>
</SidebarApp>
