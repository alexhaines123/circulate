import config from "@/config";

export const amplifyConfig = {
  ssr: true,
  // Auth: {
  //   mandatorySignIn: false,
  //   region: config.cognito.REGION,
  //   userPoolId: config.cognito.USER_POOL_ID,
  //   identityPoolId: config.cognito.IDENTITY_POOL_ID,
  //   userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  // },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "products",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
};
