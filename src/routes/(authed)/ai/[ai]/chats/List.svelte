<script>
  import { locale_datetime } from "$lib/misc/format";

  /** @type {import("$lib/types").AI} */
  export let ai;
  /** @type {import("$lib/types").Chat[]} */
  export let chats;
</script>

{#if chats.length > 0}
  <ul class="card card-fill card-nopad menu-block overflow-y-auto">
    {#each chats as chat}
      {@const href = `/ai/${ai.slug}/chats/${chat.id}`}
      <li class="!px-2">
        <a class="flex gap-2" {href}>
          <div class="intro overflow-hidden">
            <h6>{chat.summary}</h6>
            <p>{locale_datetime(chat.updated_at)}</p>
          </div>
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <div class="center text-intro">Empty</div>
{/if}
