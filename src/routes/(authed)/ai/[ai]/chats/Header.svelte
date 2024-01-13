<script>
  /** @type {import("$lib/types").AI} */
  export let ai;
  /** @type {import("$lib/types").Chat[]} */
  export let chats;
</script>

<header class="flex justify-between items-center">
  <div class="flex gap-2 items-center">
    <label for="ai" class="btn btn-sm btn-ghost btn-square 2xl:hidden">
      <svg
        class="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 3.5v17M3 12c0-4.243 0-6.364 1.318-7.682C5.636 3 7.758 3 12 3c4.243 0 6.364 0 7.682 1.318C21 5.636 21 7.758 21 12c0 4.243 0 6.364-1.318 7.682C18.364 21 16.242 21 12 21c-4.243 0-6.364 0-7.682-1.318C3 18.364 3 16.242 3 12"
        /></svg
      >
    </label>
    <h2>{ai.name} ({chats.length})</h2>
  </div>
  <div>
    <label class="btn btn-sm btn-ghost btn-square xl:hidden" for="chat">
      <svg
        class="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M15 3.5v17M3 12c0-4.243 0-6.364 1.318-7.682C5.636 3 7.758 3 12 3c4.243 0 6.364 0 7.682 1.318C21 5.636 21 7.758 21 12c0 4.243 0 6.364-1.318 7.682C18.364 21 16.242 21 12 21c-4.243 0-6.364 0-7.682-1.318C3 18.364 3 16.242 3 12"
        /></svg
      >
    </label>
  </div>
</header>
