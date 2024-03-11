import { StackContext, NextjsSite, use } from "sst/constructs";
import { ApiStack } from "./ApiStacks/NotesApiStack";
import { AuthStack } from "./AuthStack";
import { BucketStack } from "./FileStorageStacks/BucketStack";
import { ProductsApiStack } from "./ApiStacks/ProductsApiStack";

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { api: productsApi } = use(ProductsApiStack);
  const { auth } = use(AuthStack);
  const { bucket } = use(BucketStack);

  // Define our React app
  const site = new NextjsSite(stack, "ReactSite", {
    path: "packages/frontend",
    bind: [api, auth, bucket],
    // Pass in our environment variables
    environment: {
      NEXT_API_URL: api.url,
      NEXT_PRODUCTS_API_URL: productsApi.url,
      NEXT_BUCKET: bucket.bucketName,
      NEXT_REGION: app.region,
      NEXT_USER_POOL_ID: auth.userPoolId,
      NEXT_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      NEXT_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });
}
