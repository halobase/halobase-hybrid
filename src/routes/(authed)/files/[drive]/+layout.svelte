<script>
  import StackBar from "$lib/components/display/StackBar.svelte";
  import { groupby } from "$lib/misc/algorithm.js";
  import { iec80000_bytes } from "$lib/misc/format.js";

  export let data;

  $: drive = data.drive;

  $: groups = groupby(drive?.files || [], ({ mime_type }) => {
    const [type, subtype] = mime_type.split("/");
    return type === "text" || type === "application" ? "documents" : type;
  });

  $: items = Object.entries(groups).map(([k, v]) => {
    return { key: k, value: v.reduce((a, c) => a + c.size, 0) };
  });

  $: used = items.reduce((a, c) => a + c.value, 0);

  $: stack = {
    total: drive?.total || 0,
    items,
  };
</script>

  <slot />
  <div class="relative w-full">
    <div class="absolute bottom-8 w-full">
      <div class="container container-lg py-0">
        {#if !drive}
          <div class="center text-intro">Drive not found.</div>
        {:else}
          {@const rate = drive.used / drive.total}
          <footer class="intro intro-2xl flex w-full">
            <div class="text-4xl sm:text-5xl flex mr-4">💾</div>
            <div class="grow">
              <h4 class="flex justify-between text-sm font-semibold mb-2">
                {drive.name}
                {#if drive.readonly}
                  <span class="badge ml-1">read-only</span>
                {/if}
              </h4>
              <div class="flex flex-col gap-1 w-full">
                <div class="w-full">
                  <StackBar data={stack} />
                </div>
                <span class="text-intro text-xs">
                  {iec80000_bytes(used)} /
                  {iec80000_bytes(drive.total)}
                </span>
              </div>
            </div>
          </footer>
        {/if}
      </div>
    </div>
  </div>
