<!-- Taken from https://github.com/sveltejs/site-kit/blob/master/packages/site-kit/src/lib/nav/PreloadingIndicator.svelte -->
<script>
  import { navigating } from "$app/stores";
  import { onMount } from "svelte";
  import { quadInOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  let p = tweened(0, { easing: quadInOut });
  let visible = false;

  onMount(() => {
    /** @type {number} */
    let timer;
    function next() {
      visible = true;
      const r = 1 - $p;
      p.update((v) => v + 0.1, {
        duration: r + 0.1 > 0.15 ? 250 : 500 / r,
      }); 
      if (r > 0.15) {
        timer = setTimeout(next, 500 / r);
      }
    }
    timer = setTimeout(next, 250);
    return () => clearTimeout(timer);
  });
</script>

{#if $navigating}
  {#if visible}
    <div class="progress-container">
      <div class="progress" style="inline-size: {$p * 100}%" />
    </div>
  {/if}

  {#if $p >= 0.4}
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
