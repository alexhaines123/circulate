import * as uuid from "uuid";
import handler from "@notes/core/handler";
import { createProduct } from "@notes/core/rds/repository/product";

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
    product_id: uuid.v1(), // A unique uuid
    title: data.title, // Parsed from request body
    description: data.description, // Parsed from request body
    price: parseFloat(data.price), // Parsed from request body
  };
  console.log(params, event.body)

  const product = await createProduct(params);

  return JSON.stringify(product);
});
