<script>
  import { afterUpdate } from "svelte";

  /** @type {Element} */
  let ref;

  /** @param {Element} e  */
  function __scroll(e) {
    e.scroll({ top: e.scrollHeight, behavior: "smooth" });
  }

  afterUpdate(function () {
    __scroll(ref);
  });
</script>

<ul bind:this={ref} class="scrollbar scrollbar-md overflow-y-auto">
  <div class="h-[1024px]"></div>
</ul>
