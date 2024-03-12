import * as trpc from "@trpc/server";
import { findProducts } from "./rds/repository/product";
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

export const handler = awsLambdaRequestHandler({
  router: router,
});
