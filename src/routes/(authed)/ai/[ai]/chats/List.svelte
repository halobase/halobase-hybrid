<script>
  import { page } from "$app/stores";
  import { locale_datetime } from "$lib/misc/format";

  /** @type {import("$lib/types").AI} */
  export let ai;
  /** @type {import("$lib/types").Chat[]} */
  export let chats;
</script>

{#if chats.length > 0}
  <ul class="card card-fill card-nopad menu-block overflow-y-auto sb sb-sm">
    {#each chats as chat}
      {@const href = `/ai/${ai.slug}/chats/${chat.id}`}
      <li class="!px-2" class:active={$page.url.pathname.startsWith(href)}>
        <a class="intro overflow-hidden" {href}>
          <h6>{chat.summary}</h6>
          <p class="!text-xs mt-1">{locale_datetime(chat.updated_at)}</p>
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <div class="center text-intro">Empty</div>
{/if}
