<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  /**
   * @typedef {EventTarget & {
   *   files : FileList
   * }} FileEventTarget
   */

  /**
   * @type {{
   *   id: string,
   *   url: string,
   * }[]}
   */
  let images = [
    {
      id: "a",
      url: "https://sfile.chatglm.cn/chatglm4/799783e6-8e85-4dc1-9ffe-bb70e01bbc8c.jpg",
    },
    {
      id: "b",
      url: "https://sfile.chatglm.cn/chatglm4/2b865842-cf03-4eb7-849a-c5d951127d73.png",
    },
    {
      id: "c",
      url: "https://sfile.chatglm.cn/chatglm4/2f155d23-d72d-459e-856f-c68369bd5cac.jpg",
    },
  ];

  /** @param {Event} e  */
  async function __change(e) {
    const files = /** @type {FileEventTarget} */ (e.target).files;
    const form = new FormData();
    for (const file of files) {
      form.append("file", file);
    }
    
    dispatch("change", images);
  }

  /** @param {number} i  */
  function __remove(i) {
    images = images.filter((_, j) => i !== j);
    dispatch("change", images);
  }
</script>

<div class="relative">
  {#if images}
    <div class="absolute bottom-full flex gap-4 w-max mb-6 rounded-xl">
      {#each images as f, i}
        <div class="relative">
          <button
            class="absolute -right-2 -top-2 z-20 btn btn-beta btn-circle"
            type="button"
            on:click={() => __remove(i)}
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              />
            </svg>
          </button>
          <img class="max-h-16 md:max-h-24 rounded-lg" src={f.url} alt={f.id} />
        </div>
      {/each}
    </div>
  {/if}
  <label class="hover:text-alpha-500 cursor-pointer text-intro">
    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      ><g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></g
      >
    </svg>
    <input class="hidden" type="file" multiple on:change={__change} />
  </label>
</div>
