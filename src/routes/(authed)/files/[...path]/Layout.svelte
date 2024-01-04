<script>
  export let open = false;
</script>

<div class="drawer drawer-b sm:drawer-r sm:drawer-x-only">
  <input type="checkbox" id="file" bind:checked={open} />
  <main class="container container-col container-xl">
    <slot />
  </main>
  <aside>
    <label for="file"></label>
    <div class="card p-4 h-full w-full sm:w-80 md:w-96 md:px-6">
      <div class="sm:mb-6">
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
