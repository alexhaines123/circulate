import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("product")
    .addColumn("product_id", "text", (col) => col.primaryKey())
    .addColumn("title", "text")
    .addColumn("description", "text")
    .addColumn("price", "numeric")
    .execute();

  await db.schema
    .createTable("product_image")
    .addColumn("product_image_id", "text", (col) => col.primaryKey())
    .addColumn("product_id", "text", (col) =>
      col.references("product.product_id").onDelete("cascade").notNull()
    )
    .addColumn("key", "text", (col) => col.notNull())
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("product_image").execute();
  await db.schema.dropTable("products").execute();
}
