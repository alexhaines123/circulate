import { Api, StackContext, use } from "sst/constructs";
import { MarketplaceDatabaseStack } from "../DatabaseStacks/MarketplaceDatabaseStack";
import { ProductStorageStack } from "../StorageStacks/ProductStorageStack";

export function ProductsApiStack({ stack }: StackContext) {
  const { cluster } = use(MarketplaceDatabaseStack);
  const { table } = use(ProductStorageStack);

  // Create the API
  const api = new Api(stack, "ProductsApi", {
    defaults: {
      function: {
        bind: [cluster, table],
      },
    },
    routes: {
      "POST /products": "packages/functions/src/products/create.main",
      "GET /products": "packages/functions/src/products/list.main",
      "ANY /trpc/{proxy+}":
        "packages/functions/src/products/trpc/index.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpointProducts: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
