<div class="w-full h-full">
  <div class="drawer drawer-l drawer-s drawer-scale">
    <input type="checkbox" id="app" />
    <main class="flex flex-col w-full">
      <div class="flex gap-2 px-2 py-4">
        <label for="app" class="btn btn-ghost btn-square sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            ><path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            /></svg
          >
        </label>
        <slot name="header" />
      </div>
      <slot name="route" />
      <slot name="footer" />
    </main>
    <aside>
      <label for="app" />
      <div
        class="flex flex-col sm:max-w-fit p-2 lg:p-4 border-r border-fore border-opacity-20"
      >
        <div class="flex items-center justify-between">
          <slot name="brand">
            <a class="btn" href="/">
              <h2 class="font-semibold text-xl">Brand</h2>
            </a>
          </slot>
          <label for="app" class="btn btn-ghost btn-square sm:hidden">
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
        <div class="sm:w-40 md:w-52 lg:w-64 xl:w-80 grow">
          <slot name="sidebar">sidebar</slot>
        </div>
      </div>
    </aside>
  </div>
</div>
