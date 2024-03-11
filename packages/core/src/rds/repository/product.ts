import db from "../connection";
import { NewProduct } from "../types/product";

export async function createProduct(product: NewProduct) {
  return await db
    .insertInto("product")
    .values(product)
    .returningAll()
    .executeTakeFirstOrThrow();
}
