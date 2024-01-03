<!-- taken from https://github.com/sveltejs/svelte/blob/master/sites/svelte.dev/src/lib/components/PreloadingIndicator.svelte -->
<script>
  import { navigating } from "$app/stores";
  import { onMount } from "svelte";

  let p = 0;
  let visible = false;

  onMount(() => {
    function next() {
      visible = true;
      p += 0.1;
      const r = 1 - p;
      if (r > 0.15) setTimeout(next, 500 / r);
    }
    setTimeout(next, 250);
  });
</script>

{#if $navigating}
  {#if visible}
    <div class="progress-container">
      <div class="progress" style="inline-size: {p * 100}%" />
    </div>
  {/if}

  {#if p >= 0.4}
    <div class="fade" />
  {/if}
{/if}

<style>
  .progress-container {
    @apply absolute top-0 left-0 w-full h-[4px] z-[999];
  }
  .progress {
    @apply absolute top-0 left-0 h-full bg-alpha-500;
    transition: width 0.4s;
  }
  .fade {
    @apply fixed w-full h-full bg-back bg-opacity-30;
    @apply pointer-events-none z-[998];
    animation: fade 0.4s;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
