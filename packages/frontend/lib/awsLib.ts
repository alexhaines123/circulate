import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Storage } from "aws-amplify";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Bucket } from "sst/node/bucket";

export async function s3Upload(file: File) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

export async function s3GetSignedUrl() {
  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    Bucket: Bucket.Uploads.bucketName,
  });
  const signedFileUploadUrl = await getSignedUrl(new S3Client({}), command);

  return signedFileUploadUrl;
}
