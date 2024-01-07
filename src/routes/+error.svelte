<script>
  import { page } from "$app/stores";

  const __page = $page;
</script>

<div class="center gap-6 p-4">
  <h1 class="text-3xl font-semibold">
    Oops 😶 {__page.status}
  </h1>
  <div class="card card-error intro min-w-72 max-w-96">
    <h4>
      {#if __page.status === 500}
        HaloBase server cannot response for now.
      {:else}
        {__page.error?.message}
      {/if}
    </h4>
    {#if __page.error?.detail}
      <p>{__page.error?.detail}</p>
    {/if}
  </div>
</div>
