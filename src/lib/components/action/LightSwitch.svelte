<script>
  import { onMount } from "svelte";
  import { extract_theme, swap_theme } from "./dom";

  let checked = false;

  function __change() {
    const theme = extract_theme();
    if (theme) {
      const theme_next = checked ? theme + "-dark" : theme.replace("-dark", "");
      swap_theme(theme_next, theme);
    }
  }

  onMount(function () {
    const theme = extract_theme();
    checked = theme?.endsWith("-dark") || false;
  });
</script>

<input
  class="switch switch-alpha"
  type="checkbox"
  bind:checked
  on:change={__change}
/>
