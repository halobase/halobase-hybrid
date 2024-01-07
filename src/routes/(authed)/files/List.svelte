<script>
  import { iec80000_bytes } from "$lib/misc/format";

  /** @type {import('$lib/types').Drive[]} */
  export let drives;
</script>

{#if drives.length === 0}
  <div class="center h-full text-sm">No drives found</div>
{:else}
  <div class="flex flex-col gap-4">
    {#each drives as drive}
      {@const href = `/files/${drive.slug}/tree`}
      {@const rate = drive.used / drive.total}
      <a class="card card-hover flex px-2 sm:px-4" {href}>
        <span class="text-4xl mr-2 sm:mr-4">💾</span>
        <div class="grow">
          <h4 class="flex justify-between text-sm font-semibold mb-2">
            {drive.name}
            {#if drive.readonly}
              <span class="badge ml-1">read-only</span>
            {/if}
          </h4>
          <label class="flex flex-col gap-1 w-full">
            <progress
              class="progress progress sm:progress-medium sm:max-w-64 md:max-w-80"
              class:progress-alpha={rate <= 0.7}
              class:progress-warn={rate > 0.7 && rate <= 0.9}
              class:progress-error={rate > 0.9}
              value={drive.used}
              max={drive.total}
            />
            <span class="text-intro text-xs">
              {iec80000_bytes(drive.used)} /
              {iec80000_bytes(drive.total)}
            </span>
          </label>
        </div>
      </a>
    {/each}
  </div>
{/if}
