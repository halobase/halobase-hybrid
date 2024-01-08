<script>
  /** @type {import('$lib/types').Drive[]} */
  export let drives;
  /** @type {typeof drives[0]} */
  export let drive;
</script>

<div class="details">
  <div class="summary btn btn-ghost" tabindex="0" role="button">{drive.name}</div>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <nav class="card card-fill menu text-sm min-w-36" tabindex="0">
    <ul>
      {#each drives as dv}
        <li>
          <a
            class="flex justify-between !gap-10"
            class:active={dv.slug === drive.slug}
            href="/files/{dv.slug}/tree"
          >
            <div>
              <span class="mr-1" class:opacity-0={dv.slug !== drive.slug}>💾</span>
              {dv.name}
            </div>
            <span>{Math.ceil((dv.used / dv.total) * 100)}%</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div>
