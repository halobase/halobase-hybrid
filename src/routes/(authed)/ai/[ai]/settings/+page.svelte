<script>
  import { EditableRangeInput, Form, GroupCheckbox } from "$lib";
  import { groupby } from "$lib/misc/algorithm.js";

  export let data;
  $: ai = data.ai;
  $: fns = Object.entries(groupby(data.fns, ({ group }) => group));
</script>

<div class="container pt-2 2xl:ml-0">
  <div class="intro intro-2xl">
    <h2>Assistant Settings</h2>
  </div>

  <div class="flex gap-4">
    <div class="grow">
      <Form action="?/update" align="left">
        <div class="group">
          <h2>Face & Name</h2>
          <div class="flex gap-2 mb-1">
            <label class="w-12">
              <input
                class="input input-center px-0"
                type="text"
                name="icon"
                value={ai.icon}
                required
              />
            </label>
            <label class="w-full">
              <input
                class="input"
                type="text"
                name="name"
                value={ai.name}
                required
              />
            </label>
          </div>
          <p>Face can be any Emoji and name needs to be unique.</p>
        </div>
        <label>
          <h2>System Prompt</h2>
          <textarea
            class="input h-20"
            name="system_prompt"
            value={ai.system_prompt}
          ></textarea>
          <p>
            Large language models are somehow prompt driven. Learn
            <a
              class="underline underline-offset-2"
              href="//"
              target="_blank"
              rel="noopener noreferrer">how to write better prompt</a
            >.
          </p>
        </label>
        <div class="group">
          <h2>Parameters</h2>
          <div class="grid sm:grid-cols-2 gap-4 mb-1">
            <div class="text-center">
              <p class="text-intro mt-1">Temperature</p>
              <EditableRangeInput name="temperature" value={ai.temperature} />
            </div>
            <div class="text-center">
              <p class="text-intro mt-1">Top P</p>
              <EditableRangeInput name="top_p" value={ai.top_p} />
            </div>
          </div>
          <p>
            You may want to increase one of these two parameters for more
            creative results given by your AI assistant.
          </p>
        </div>
        <div class="group grid gap-2">
          <h2>Tools</h2>
          {#each fns as [name, functions]}
            {@const group = {
              name,
              options: functions.map(({ slug }) => ({
                name: "tools",
                value: slug,
              })),
            }}
            <GroupCheckbox {group} let:i>
              <div class="intro intro-sm">
                <h4>{functions[i].name}</h4>
                <p>{functions[i].description}</p>
              </div>
            </GroupCheckbox>
          {/each}
          <p>
            Your AI assistant will use the tools you pick while chatting with you.
            General tools may be useful for every assistant. Note that your token 
            consumption goes faster the more tools you pick.
          </p>
        </div>
        <svelte:fragment slot="submit">Apply & Save</svelte:fragment>
      </Form>
    </div>
    <div class="w-0"></div>
  </div>
</div>
