<script>
  import { onMount } from "svelte";
  import { extract_theme } from "./dom";

  /** 
    @typedef {{
      id: string,
      name: string,
    }} Theme 
   */

  /** @type {Theme[]} */
  const themes = [
    { id: "theme-zima_blue", name: "Zima Blue" },
    { id: "theme-loki_green", name: "Loki Green" },
  ];

  /** @type {string} */
  let selected;

  onMount(function () {
    const theme = extract_theme();
    selected = theme?.replace("-dark", "") || themes[0].id;
  });
</script>

<ul class="card card-fill card-nopad !mb-6 intro intro-sm">
  {#each themes as theme}
    <li>
      <label class="flex items-center gap-2 theme-{theme.id}">
        <input
          class="radio"
          type="radio"
          name="theme"
          value={theme.id}
          checked={selected === theme.id}
          bind:group={selected}
        />
        <h2 class="ml-1">{theme.name}</h2>
      </label>
    </li>
  {/each}
</ul>
