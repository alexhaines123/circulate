import { Api, Config, StackContext, use } from "sst/constructs";
import { ProductStorageStack } from "../StorageStacks/ProductStorageStack";

export function ProductsApiStack({ stack }: StackContext) {
  const { table } = use(ProductStorageStack);

  // Create the API
  const api = new Api(stack, "ProductsApi", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "POST /products": "packages/functions/src/products/create.main",
      "GET /products": "packages/functions/src/products/list.main",
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
