<script>
  import { iec80000_bytes } from "$lib/misc/format.js";

  export let data;

  $: drive = data.drive;
</script>

<div class="container container-lg">
  {#if !drive}
    <div class="center intro-text">Drive not found.</div>
  {:else}
    {@const rate = drive.used / drive.total}
    <header class="flex intro intro-2xl">
      <div class="text-5xl flex mr-4">💾</div>
      <div class="grow">
        <h4 class="flex justify-between text-sm font-semibold mb-2">
          {drive.name}
          {#if drive.readonly}
            <span class="badge ml-1">read-only</span>
          {/if}
        </h4>
        <label class="card-wrap gap-1 w-full sm:items-center">
          <progress
            class="progress progress sm:progress-medium sm:max-w-64 md:max-w-80"
            class:progress-alpha={rate <= 0.7}
            class:progress-warn={rate > 0.7 && rate <= 0.9}
            class:progress-error={rate > 0.9}
            value={drive.used}
            max={drive.total}
          />
          <span class="intro-text text-nowrap">
            {iec80000_bytes(drive.used)} /
            {iec80000_bytes(drive.total)}
          </span>
        </label>
      </div>
    </header>
  {/if}
</div>
