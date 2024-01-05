import { S3_BUCKET, S3_KEY_ID, S3_KEY_SECRET, S3_REGION, S3_URL } from "$env/static/private";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  endpoint: S3_URL,
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_KEY_ID,
    secretAccessKey: S3_KEY_SECRET
  },
  forcePathStyle: true
});



export {
  PutObjectCommand,
  S3_BUCKET
}