<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  /** @type {"file" | "folder" | undefined} */
  let mode;

  $: if (mode) {
    dispatch("change", mode);
    mode = undefined;
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="details details-end">
  <div class="summary btn btn-alpha" tabindex="0">
    New
    <svg
      class="ml-1"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      ><path fill="currentColor" d="m7 10l5 5l5-5H7z" />
    </svg>
  </div>
  <ul class="card card-nopad card-fill menu-block w-64" tabindex="0">
    <li>
      <label class="intro intro-sm">
        <h4>Folder</h4>
        <p>Create a folder where multiple files can be uploaded onto.</p>
        <input class="hidden" type="radio" value="folder" bind:group={mode} />
      </label>
    </li>
    <li>
      <label class="intro">
        <h4>Files</h4>
        <p>Upload files to the currently open folder.</p>
        <input class="hidden" type="radio" value="file" bind:group={mode} />
      </label>
    </li>
  </ul>
</div>
