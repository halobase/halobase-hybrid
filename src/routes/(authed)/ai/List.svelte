<script>
  import { page } from "$app/stores";

  /** @type {import("$lib/types").AI[]} */
  export let ais;
</script>

{#if ais.length > 0}
  <ul class="card card-fill card-nopad menu-block overflow-y-auto">
    {#each ais as ai}
      {@const href = `/ai/${ai.slug}/chats`}
      <li class="!px-2" class:active={$page.url.pathname.startsWith(href)}>
        <a class="flex gap-2 h-16" {href}>
          <span class="text-3xl">{ai.icon}</span>
          <div class="intro intro-sm text-ellipsis overflow-hidden">
            <h5>{ai.name}</h5>
            <p>{ai.system_prompt}</p>
          </div>
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <div class="center text-center text-intro">
    Click the "Add" button to create an AI assistant.
  </div>
{/if}
