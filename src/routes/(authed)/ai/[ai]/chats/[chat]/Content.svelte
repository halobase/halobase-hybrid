<script>
  import { Markdown } from "$lib";

  /** @type {import("$lib/types").MessageContent} */
  export let content;
</script>

<div class="flex flex-col gap-2">
  {#each content as a}
    {#if a.type === "text"}
      <Markdown text={a.text} />
    {:else if a.type === "image"}
      <p>
        <img class="max-w-32 lg:max-w-40 rounded-xl" src={a.image} alt="" />
      </p>
    {/if}
  {/each}
</div>
