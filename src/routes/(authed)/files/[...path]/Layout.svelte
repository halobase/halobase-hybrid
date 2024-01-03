<script>
  export let open = false;
</script>

<div class="drawer drawer-r grow">
  <input type="checkbox" id="file" bind:checked={open} />
  <main>
    <label class="btn" for="file"> Open </label>
    <div class="px-4 sm:px-8 pt-6">
      <slot />
    </div>
  </main>
  <aside>
    <label for="file"></label>
    <div class="border-r border-fore border-opacity-20 p-4 w-full sm:w-80 md:w-96">
      <div>
        <label for="file" class="btn btn-ghost btn-square btn-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            /></svg
          >
        </label>
      </div>
      <slot name="sidebar" />
    </div>
  </aside>
</div>
