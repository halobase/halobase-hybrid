<script>
  /** @type {import("$lib/types").File} */
  export let file;
</script>

<div class="center text-3xl sm:mb-4 sm:text-6xl">
  <button type="button">{file?.mime_type ? "📄" : "📁"}</button>
</div>
