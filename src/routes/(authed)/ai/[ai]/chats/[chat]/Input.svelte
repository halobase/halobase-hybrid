<script>
  import { debounce } from "$lib/misc/algorithm";
  import { createEventDispatcher } from "svelte";
  import ImagePicker from "./ImagePicker.svelte";

  const dispatch = createEventDispatcher();

  /** @type {string} */
  let value;
  /** @type {import("$lib/types").MessageContent} */
  let content = [];

  /** @param {SubmitEvent} e */
  function __submit(e) {
    submit();
  }

  function submit() {
    content.push({ type: "text", text: value });
    dispatch("submit", content);
    clear();
  }

  function clear() {
    value = "";
    content.length = 0;
  }

  /** @param {KeyboardEvent} e */
  function ready(e) {
    return e.key === "Enter" && !e.ctrlKey && !e.shiftKey;
  }

  /** @param {KeyboardEvent} e */
  function __press(e) {
    if (ready(e)) {
      return submit();
    }
  }
</script>

<form on:submit|preventDefault={__submit} class="relative block pb-2 sm:pb-4">
  <div class="absolute top-0 z-20 w-full flex justify-between gap-2 p-2">
    <div class="w-full flex gap-2">
      <ImagePicker />
    </div>
    <button class="hover:text-alpha-500 cursor-pointer" type="submit">
      <svg
        class="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><g fill="none"
          ><path
            d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
          /><path
            fill="currentColor"
            d="M20.235 5.686c.432-1.195-.726-2.353-1.921-1.92L3.709 9.048c-1.199.434-1.344 2.07-.241 2.709l4.662 2.699l4.163-4.163a1 1 0 0 1 1.414 1.414L9.544 15.87l2.7 4.662c.638 1.103 2.274.957 2.708-.241z"
          /></g
        ></svg
      >
    </button>
  </div>
  <textarea
    class="input px-2 pt-10 h-20 lg:h-24 sb-sm"
    placeholder="Tap here to enter messages."
    bind:value
    on:keypress={debounce(__press, 200)}
  ></textarea>
</form>
