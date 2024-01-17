<script>
  import { marked } from "marked";
  /** @type {string} */
  export let text;
</script>

<div class="markdown">
  {@html marked(text)}
</div>
