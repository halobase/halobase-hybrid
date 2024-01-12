import { deserialize_response } from '$lib/misc/encoding.js';
import { get } from '$lib/misc/form.js';
import { fail } from '@sveltejs/kit';
import posixpath from "path/posix";

export const actions = {
  create: async function (event) {
    const { drive } = event.params;
    const form = await event.request.formData();
    form.set("drive", drive);
    const res = await event.fetch("/api/legacy/files", {
      method: "POST",
      body: form,
    });
    const [file, error] = await deserialize_response(res);
    return error ? fail(res.status, error) : file;
  },
  delete: async function (event) {
    const form = await event.request.formData();
    const file_id = get(form, "id");
    const res = await event.fetch(
      posixpath.join("/api/files", file_id), {
      method: "DELETE",
    });
    const [body, error] = await deserialize_response(res);
    return error ? fail(res.status, error) : body;
  },
  move: async function (event) {

  }
};
