import { ExpressionBuilder } from "kysely";
import db from "../connection";
import { Database } from "../types/db";
import { NewProduct, NewProductImage, Product } from "../types/product";
import { jsonArrayFrom } from "kysely/helpers/postgres";

export async function findProducts(
  criteria: Partial<Product>,
  likeCriteria?: Partial<Product>,
) {
  let query = db.selectFrom("product").select((eb) => withProductImages(eb));

  if (criteria.product_id) {
    query = query.where("product_id", "=", criteria.product_id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.title) {
    query = query.where("title", "=", criteria.title);
  }

  query = query.where((eb) => {
    const clauses = [];
    if (likeCriteria?.title) {
      clauses.push(eb("title", "like", `%${likeCriteria.title}%`));
    }
    if (likeCriteria?.description) {
      clauses.push(eb("description", "like", `%${likeCriteria.description}%`));
    }
    return eb.or(clauses);
  });

  return await query.selectAll().execute();
}

export async function getProduct(criteria: Pick<Product, "product_id">) {
  let query = db
    .selectFrom("product")
    .select(["product_id", "title", "description", "price"])
    .select((eb) => withProductImages(eb));

  query = query.where("product_id", "=", criteria.product_id); // Kysely is immutable, you must re-assign!

  return await query.execute();
}

export async function createProduct(product: NewProduct) {
  return await db
    .insertInto("product")
    .values(product)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function createProductImage(
  productImage: NewProductImage | NewProductImage[],
) {
  return await db
    .insertInto("product_image")
    .values(productImage)
    .returningAll()
    .executeTakeFirstOrThrow();
}

function withProductImages(eb: ExpressionBuilder<Database, "product">) {
  return jsonArrayFrom(
    eb
      .selectFrom("product_image")
      .select(["product_image.key", "product_image.product_image_id"])
      .whereRef("product_image.product_id", "=", "product.product_id"),
  ).as("product_images");
}
