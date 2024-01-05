import { PutObjectCommand, S3_BUCKET, s3 } from "$lib/clients/s3";
import { authenticate } from "$lib/server/auth.js";
import posixpath from "path/posix";


export async function POST(event) {

  const { id, token } = await authenticate(event.request, event.cookies);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const form = await event.request.formData();
  const path = form.get("path")?.toString() || "";
  const file = form.get("file");

  if (!(file instanceof File)) {
    return Response.json(
      { message: "missing file" },
      { status: 400 },
    );
  }

  try {
    const res = await s3.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: posixpath.join(id, path, file.name),
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
      ContentLength: file.size,
    }));
    return Response.json({
      etag: res.ETag?.replaceAll("\"", ""),
      mime_type: file.type,
      size: file.size,
      name: file.name,
      metadata: res.$metadata,
    });
  } catch (e) {
    return Response.json(
      { message: (e instanceof Error) ? e.message : e },
      { status: 500 },
    );
  }
}
