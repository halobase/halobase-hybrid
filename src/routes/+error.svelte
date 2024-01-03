<script>
  import { page } from "$app/stores";
</script>

<div class="center gap-6 p-4">
  <h1 class="text-3xl font-semibold">
    Oops 😶 {$page.status}
  </h1>
  <div class="card card-error">
    ERROR: {$page.error?.message}
  </div>
</div>
