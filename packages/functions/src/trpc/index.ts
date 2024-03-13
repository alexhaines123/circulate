import { productsRouter } from "./products";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { fileRouter } from "./file";
import { router } from "./trpc";

const appRouter = router({
  file: fileRouter,
  products: productsRouter,
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
