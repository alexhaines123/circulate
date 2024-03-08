export const config = {
  STRIPE_KEY: "<YOUR_STRIPE_PUBLIC_KEY>",
  // Backend config
  s3: {
    REGION: process.env.NEXT_REGION,
    BUCKET: process.env.NEXT_BUCKET,
  },
  apiGateway: {
    REGION: process.env.NEXT_REGION,
    URL: process.env.NEXT_PRODUCTS_API_URL,
  },
  cognito: {
    REGION: process.env.NEXT_REGION,
    USER_POOL_ID: process.env.NEXT_USER_POOL_ID,
    APP_CLIENT_ID: process.env.NEXT_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.NEXT_IDENTITY_POOL_ID,
  },
  MAX_ATTACHMENT_SIZE: 5000000,
};

export default config;
