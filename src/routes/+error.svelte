<script>
  import { page } from "$app/stores";
</script>

<div class="center gap-6 p-4">
  <h1 class="text-3xl font-semibold">
    Oops 😶 {$page.status}
  </h1>
  <div class="card card-error min-w-72 max-w-96">
    ERROR: {$page.error?.message}
  </div>
</div>
