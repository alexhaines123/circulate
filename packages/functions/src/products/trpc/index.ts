import * as trpc from "@trpc/server";
import { findProducts } from "@notes/core/rds/repository/product";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

const router = trpc.router().query("productList", {
  async resolve(req) {
    const products = await findProducts({});
    return products;
  },
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof router;

export const main = awsLambdaRequestHandler({
  router: router,
  responseMeta() {
    return {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
  },
});
