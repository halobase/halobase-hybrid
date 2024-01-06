import { deserialize_response } from '$lib/misc/encoding.js';
import { fail } from '@sveltejs/kit';
import posixpath from "path/posix";

export const actions = {
  create: async function (event) {
    const { drive, path } = event.params;
    const res = await event.fetch(
      posixpath.join("/api/files", drive, path), {
      method: "POST",
      body: await event.request.formData()
    });
    const [file, error] = await deserialize_response(res);
    return error ? fail(res.status, error) : file;
  },
  delete: async function (event) {
    const { drive, path } = event.params;
    const form = await event.request.formData();
    const name = form.get("name")?.toString();
    const res = await event.fetch(
      posixpath.join("/api/files", drive, path), {
      method: "DELETE",
      body: JSON.stringify({ name }),
    });
    const [body, error] = await deserialize_response(res);
    return error ? fail(res.status, error) : body;
  },
  move: async function (event) {
    const { drive, path } = event.params;
    const form = await event.request.formData();
    const from = form.get("from")?.toString();
    const to = form.get("to")?.toString();
    if (!to) {
      return fail(400, {
        message: "File name cannot be empty."
      });
    }
    const res = await event.fetch(
      posixpath.join("/api/files", drive, path), {
      method: "PATCH",
      body: JSON.stringify({
        from,
        to,
      }),
    });
    const [file, error] = await deserialize_response(res);
    return error ? fail(res.status, error) : file;
  }
};
