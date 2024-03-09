import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Products.tableName,
  } satisfies DocumentClient.ScanInput;

  const result = await dynamoDb.scan(params);

  // Return the matching list of items in response body
  return JSON.stringify(result.Items);
});
