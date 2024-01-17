<script>
  import List from "./List.svelte";
  import Input from "./Input.svelte";
  export let data;

  $: ai = data.ai;
  $: user = data.session.user;

  /** @type {Pick<import("$lib/types").Message, "role" | "content">[]} */
  const msgs = [
    {
      role: "ai",
      content: [
        {
          type: "text",
          text: "Hello, how can I assist you today?"
        }
      ]
    },
    {
      role: "user",
      content: [
        {
          type: "image",
          image: "https://sfile.chatglm.cn/chatglm4/799783e6-8e85-4dc1-9ffe-bb70e01bbc8c.jpg"
        },
        {
          type: "text",
          text: "图里是啥"
        }
      ]
    },
    {
      role: "ai",
      content: [
        {
          type: "text",
          text: "是一只白色的熊猫"
        }
      ]
    },
  ];

  /** @param {CustomEvent<import("$lib/types").MessageContent>} e */
  function __submit(e) {
    // msgs = [...msgs, e.detail];
  }
</script>

<div class="flex flex-col justify-between h-full overflow-hidden">
  <List {ai} {user} {msgs} />
  <Input on:submit={__submit} />
</div>
