import { Bucket, StackContext, Table } from "sst/constructs";

export function ProductStorageStack({ stack }: StackContext) {
  // Create the DynamoDB table
  const table = new Table(stack, "Products", {
    fields: {
      productId: "string",
      title: "string",
      description: "string",
      price: "number",
    },
    primaryIndex: { partitionKey: "productId" },
  });

  return {
    table,
  };
}
