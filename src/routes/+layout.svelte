<script>
  import { PreloadingIndicator } from "$lib";
  import "$lib/index.css";
</script>

<svelte:head>
  <title>HaloBase 😇 Your SaaS platform since 2024.</title>
  <!-- SEO related tags -->
</svelte:head>

<PreloadingIndicator />
<div class="app">
  <slot />
</div>