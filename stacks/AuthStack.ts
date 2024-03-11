import { ApiStack } from "./ApiStacks/NotesApiStack";
import * as iam from "aws-cdk-lib/aws-iam";
import { Cognito, StackContext, use } from "sst/constructs";
import { BucketStack } from "./FileStorageStacks/BucketStack";

export function AuthStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { bucket } = use(BucketStack);

  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  auth.attachPermissionsForAuthUsers(stack, [
    // Allow access to the API
    api,
    // Policy granting access to a specific folder in the bucket
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
      ],
    }),
  ]);

  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });

  // Return the auth resource
  return {
    auth,
  };
}
