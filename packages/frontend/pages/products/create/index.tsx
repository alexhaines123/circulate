import { CreateProductForm } from "@/components/forms/products/create";
import HeadComponent from "@/components/head";
import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

type Props = { signedFileUploadUrl: string };

function CreateProductPage({ signedFileUploadUrl }: Props) {
  return (
    <>
      <HeadComponent title="Create item" />
      <div className="prose">
        <h1>Create Item</h1>
        <CreateProductForm signedFileUploadUrl={signedFileUploadUrl} />
      </div>
    </>
  );
}

export default CreateProductPage;

export async function getServerSideProps() {
  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    Bucket: Bucket.Uploads.bucketName,
  });
  const signedFileUploadUrl = await getSignedUrl(new S3Client({}), command);

  return { props: { signedFileUploadUrl } };
}
