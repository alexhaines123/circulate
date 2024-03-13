import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Bucket } from "sst/node/bucket";
import { z } from "zod";
import { procedure, router } from "../trpc";

export async function s3GetSignedUrl() {
  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: randomUUID(),
    Bucket: Bucket.Uploads.bucketName,
  });
  const signedFileUploadUrl = await getSignedUrl(new S3Client({}), command);

  return signedFileUploadUrl;
}

export const fileRouter = router({
  batchGetSignedUploadUrls: procedure
    .input(
      z.object({
        amount: z.number().min(1).int(),
      })
    )
    .mutation(async (opts) => {
      const {
        input: { amount },
      } = opts;

      const urls = await Promise.all(
        Array(amount)
          .fill(null)
          .map(() => s3GetSignedUrl())
      );
      return urls;
    }),
});
