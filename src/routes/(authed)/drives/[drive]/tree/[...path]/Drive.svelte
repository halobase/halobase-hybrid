<script>
  import { StackBar } from "$lib";
  import { iec80000_bytes } from "$lib/misc/format";

  /**
   * @type {{
   *   total: number,
   *   items: {
   *     key: string,
   *     value: number,
   *   }[]
   * }}
   */
  export let stats;

  /** @type {import("$lib/types").Drive} */
  export let drive;
</script>

<div class="h-full flex flex-col">
  <div class="container container-lg py-0">
    {#if !drive}
      <div class="center text-intro">Drive not found.</div>
    {:else}
      <details class="details details-t">
        <summary class="btn-block p-2 sm:p-4 rounded-lg">
          <footer class="intro intro-2xl flex w-full">
            <div class=" text-2xl sm:text-5xl flex mr-4">💾</div>
            <div class="grow">
              <h5 class="flex justify-between text-sm font-semibold mb-2">
                <span class=" leading-loose">{drive.name}</span>
                {#if drive.readonly}
                  <span class="badge ml-1">RO</span>
                {/if}
              </h5>
              <div class="flex flex-col gap-1 w-full">
                <div class="w-full">
                  <StackBar {stats} />
                </div>
                <span class="text-intro text-xs">
                  {iec80000_bytes(drive.used)} /
                  {iec80000_bytes(drive.total)}
                </span>
              </div>
            </div>
          </footer>
        </summary>
      </details>
    {/if}
  </div>
</div>
