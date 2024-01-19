<script>
  import { Markdown } from "$lib";

  /** @type {Pick<import("$lib/types").Message, "role" | "content">} */
  export let msg;
</script>

<div class="flex flex-col gap-2">
  {#if typeof msg.content === "string"}
    <Markdown text={msg.content} />
  {:else if msg.content}
    {#each msg.content as a}
      {#if a.type === "text"}
        <Markdown text={a.text} />
      {:else if a.type === "image_url"}
        <p>
          <img
            class="max-w-32 lg:max-w-40 rounded-xl"
            src={a.image_url.url}
            alt=""
          />
        </p>
      {/if}
    {/each}
  {/if}
</div>
