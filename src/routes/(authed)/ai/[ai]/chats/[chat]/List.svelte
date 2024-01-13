<script>
  import { afterUpdate } from "svelte";
  import { marked } from "marked";

  /** @type {import("$lib/types").AI} */
  export let ai;
  /** @type {import("$lib/types").User} */
  export let user;
  /** @type {Pick<import("$lib/types").Message, "role" | "text">[]} */
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
    return role !== "ai" && align === "between";
  }
</script>

<ul bind:this={ref} class="scrollbar scrollbar-sm overflow-y-auto flex flex-col h-full">
  {#each msgs as m, i}
    {#if m.role === "system"}
      <li class="text-center text-intro">You are good to go.</li>
    {:else}
      <li
        class="w-3/4 flex gap-2 mb-2"
        class:items-end={to(m.role, align)}
        class:self-end={to(m.role, align)}
        class:flex-row-reverse={to(m.role, align)}
      >
        <div class="text-3xl">
          {m.role == "ai" ? `${ai.icon}` : `${user.icon}`}
        </div>
        <div
          class="card card-naked bg-opacity-20 text-sm overflow-x-auto"
          class:bg-info-500={m.role === "ai"}
          class:bg-debug-500={m.role === "user"}
        >
          {@html marked(m.text)}
        </div>
      </li>
    {/if}
    {@const n = msgs.length}
    {#if i == n - 1 && m.role === "user"}
      <li></li>
    {/if}
  {/each}
</ul>
