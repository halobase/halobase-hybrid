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

<details class="details details-end">
  <summary class="btn btn-alpha">
    New
    <svg
      class="ml-1"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      ><path fill="currentColor" d="m7 10l5 5l5-5H7z" />
    </svg>
  </summary>
  <ul class="card card-nopad card-fill menu-block w-64">
    <li>
      <label class="intro">
        <h2>Folder</h2>
        <p>Create a folder where multiple files can be uploaded onto.</p>
        <input class="hidden" type="radio" value="folder" bind:group={mode} />
      </label>
    </li>
    <li>
      <label class="intro">
        <h2>Files</h2>
        <p>Upload files to the currently open folder.</p>
        <input class="hidden" type="radio" value="file" bind:group={mode} />
      </label>
    </li>
  </ul>
</details>
