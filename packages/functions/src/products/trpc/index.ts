import { findProducts } from "@notes/core/rds/repository/product";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

import { initTRPC } from "@trpc/server";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create();
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

export const appRouter = router({
  productList: procedure.query(async () => {
    const products = await findProducts({});
    return products;
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

export const main = awsLambdaRequestHandler({
  router: appRouter,
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
