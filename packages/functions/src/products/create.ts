import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
  let data = {
    title: "",
    description: "",
    price: "",
  };

  if (event.body != null) {
    data = JSON.parse(JSON.parse(event.body)); // TODO: Why is this double-parsed?
  }

  const params = {
    TableName: Table.Products.tableName,
    Item: {
      productId: uuid.v1(), // A unique uuid
      title: data.title, // Parsed from request body
      description: data.description, // Parsed from request body
      price: data.price, // Parsed from request body
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});
