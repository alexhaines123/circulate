import handler from "@notes/core/handler";
import { findProducts } from "@notes/core/rds/repository/product";

export const main = handler(async () => {
  const products = await findProducts({});

  return JSON.stringify(products);
});
