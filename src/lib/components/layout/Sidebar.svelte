<script>
  import { page } from "$app/stores";
  import { groupby } from "$lib/misc/algorithm";

  /** @type {import("./types").Slug[]} */
  export let slugs;

  const entries = Object.entries(groupby(slugs, ({ group }) => group));
</script>

<div>
  {#each entries as [group, slugs]}
    <nav class="menu">
      <h3>{group}</h3>
      <ul>
        {#each slugs as slug}
          {@const href = group ? `/${group}/${slug.id}` : `/${slug.id}`}
          <li>
            <a {href} class:active={$page.url.pathname.startsWith(href)}>
              {#if slug.icon}
                <span>{slug.icon}</span>
              {/if}
              <span>{slug.name}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/each}
</div>
