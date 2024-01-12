<script>
  export let placeholder = "🔍 Search everything";
</script>

<header class="w-full flex items-center justify-between">
  <div class="w-1/12 md:w-1/4">
    <slot name="left" /></div>
  <div class="grow">
    <input class="input input-center" type="text" {placeholder} on:change />
  </div>
  <div class="w-1/12 md:w-1/4">
    <slot name="right" />
  </div>
</header>