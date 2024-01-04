<script>
  import { LightSwitch, ThemeSelect } from "$lib";

  /** @type {import("$lib/types").Session} */
  export let session;
</script>

<details class="details details-t p-2">
  <summary class="btn btn-block">
    <div class="flex gap-2">
      <div class="text-3xl">😇</div>
      <div class="intro intro-sm overflow-hidden">
        <h2>{session.user.email}</h2>
        <div class="text-xs text-fore text-opacity-70">
          Quota: {session.user.quota}
        </div>
      </div>
    </div>
  </summary>
  <ul class="card card-fill card-nopad menu-block w-64 intro intro-sm">
    <li>
      <details class="details details-t">
        <summary class="flex justify-between cursor-pointer">
          <h2>Color Theme</h2>
        </summary>
        <ThemeSelect />
      </details>
    </li>
    <li class="py-0 flex justify-between items-center">
      <h2>Dark Mode</h2>
      <LightSwitch />
    </li>
    <li>
      <button type="button">
        <h2>Change Password</h2>
      </button>
    </li>
    <li>
      <a class="flex text-error-500" href="/">
        <h2>Sign Out</h2>
      </a>
    </li>
  </ul>
</details>
