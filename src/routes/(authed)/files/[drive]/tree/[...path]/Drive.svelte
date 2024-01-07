<script>
  /** @type {string} */
  export let drive;
  /** @type {import('$lib/types').Drive[]} */
  export let drives;
</script>

<div class="details">
  <div class="summary btn btn-ghost" tabindex="0" role="button">{drive}</div>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <nav class="card card-fill menu text-sm min-w-36" tabindex="0">
    <ul>
      {#each drives as dv}
        <li>
          <a
            class="flex justify-between !gap-4"
            class:active={dv.slug === drive}
            href="/files/{dv.slug}/tree"
          >
            <div>
              <span class="mr-1" class:opacity-0={dv.slug !== drive}>💾</span>
              {dv.name}
            </div>
            <span>{Math.ceil((dv.used / dv.total) * 100)}%</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div>
