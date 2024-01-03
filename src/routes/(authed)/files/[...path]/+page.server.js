import { fail } from '@sveltejs/kit';

export const actions = {
  create: async function (event) {
    const path = event.params.path;
    const form = await event.request.formData();
    const res = await event.fetch(
      path ? `/api/files/${path}` : "/api/files", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name")?.toString(),
          etag: form.get("etag")?.toString(),
          mime_type: form.get("mime_type")?.toString(),
          size: Number(form.get("size")?.toString() ?? 0),
          state: form.get("state")?.toString(),
        })
      }
    );
    if (!res.ok) {
      return fail(res.status, await res.json());
    }
    return await res.json();
  }
};
