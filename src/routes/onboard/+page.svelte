<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Form, OTP } from "$lib";

  /** @type {import("$lib/types").GrantType} */
  let grant_type = "PP";
  /** @type {string} */
  let email;
  /** @type {string} */
  let error;

  /** @param {CustomEvent<Error>} e  */
  function __fail(e) {
    error = e.detail.message;
  }

  /** @param {CustomEvent<import("$lib/types").Token>} e */
  async function __succeed(e) {
    const path = $page.url.searchParams.get("redirect_to") || "/";
    await goto(path);
  }
</script>

<div class="h-full flex flex-col items-center justify-center md:flex-row md:justify-around">
  <div class="w-full p-4 md:p-0 max-w-80">
    <h2 class="mb-3 text-3xl font-semibold">Hello :)</h2>
    <Form align="full" on:failure={__fail} on:success={__succeed}>
      <label>
        <p>Choose a way to sign in / up.</p>
        <select class="select" name="grant_type" bind:value={grant_type}>
          <option value="PP">User Password</option>
          <option value="OTP">One-Time Password</option>
          <option value="AK">API Key</option>
        </select>
      </label>
      {#if grant_type != "AK"}
        <label>
          <input
            class="input"
            type="email"
            name="email"
            placeholder="E-email Address"
            autocomplete="email"
            bind:value={email}
            required
          />
        </label>
      {/if}
      {#if grant_type === "PP"}
        <label>
          <input
            class="input"
            type="password"
            name="secret"
            placeholder="Password"
            required
          />
        </label>
      {:else if grant_type === "OTP"}
        <div class="flex gap-4">
          <label class="grow">
            <input
              class="input"
              type="password"
              name="secret"
              placeholder="OTP"
              required
            />
          </label>
          <OTP id={email} endpoint="/api/auth/otp" on:failure={__fail} />
        </div>
      {:else if grant_type === "AK"}
        <div class="card card-warn">
          WARN: this is experimental, unexpected issues may occur.
        </div>
        <label class="grow">
          <input
            class="input"
            type="text"
            name="secret"
            placeholder="Your API Key"
            required
          />
        </label>
      {/if}
      {#if error}
        <div class="card card-error">{error}</div>
      {/if}
      <svelte:fragment slot="submit">Sign in / up</svelte:fragment>
    </Form>
    <p class="text-sm text-fore text-opacity-80 mt-2">
      You will be signed up automatically the first time you sign in and by
      signing in / up, you agree to Halobase's
      <button class="underline" type="button">Terms of Service</button>.
    </p>
  </div>
  <div class="p-4">
    <h1 class="text-xl font-semibold">
      HaloBase 😇 Your SaaS platform since 2024.
    </h1>
  </div>
</div>
