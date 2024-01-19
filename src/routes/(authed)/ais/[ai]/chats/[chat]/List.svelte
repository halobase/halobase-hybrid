<script>
  import { afterUpdate } from "svelte";
  import Completion from "./Completion.svelte";
  import Content from "./Content.svelte";

  /** @type {import("$lib/types").AI} */
  export let ai;
  /** @type {import('$lib/types').Chat} */
  export let chat;
  /** @type {import("$lib/types").User} */
  export let user;
  /** @type {Pick<import("$lib/types").Message, "role" | "content">[]} */
  export let msgs;
  /** @type {"left" | "between"} */
  export let align = "between";

  /** @type {Element} */
  let ref;

  /** @param {Element} e  */
  function scroll(e) {
    e.scroll({ top: e.scrollHeight, behavior: "smooth" });
  }

  afterUpdate(function () {
    scroll(ref);
  });

  /**
   * @param {string} role
   * @param {string} align
   */
  function to(role, align) {
    return role !== "assistant" && align === "between";
  }
</script>

<ul bind:this={ref} class="sb sb-sm overflow-y-auto flex flex-col h-full">
  {#each msgs as msg, i}
    {@const role = msg.role}
    {#if role === "system"}
      <li class="text-center text-intro">You are good to go.</li>
    {:else}
      <li
        class="w-3/4 flex gap-2 mb-2"
        class:self-end={to(role, align)}
        class:flex-row-reverse={to(role, align)}
      >
        {#if role === "assistant"}
          <a class="text-3xl" href="/ais/{ai.slug}/settings">
            {ai.icon}
          </a>
        {:else}
          <div class="text-3xl">{user.icon}</div>
        {/if}
        <div
          class="bubble mt-1"
          class:bubble-l={role === "assistant"}
          class:bubble-r={role === "user"}
          class:bubble-info={role === "assistant"}
          class:bubble-alpha={role === "user"}
        >
          <Content {msg} />
        </div>
      </li>
    {/if}
    {@const n = msgs.length}
    {#if i == n - 1 && role === "user"}
      <li class="w-3/4 flex gap-2 mb-2">
        <Completion {ai} {chat} {msgs} on:close />
      </li>
    {/if}
  {/each}
</ul>
