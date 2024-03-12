import { ProductImageTable, ProductTable } from "./product";

export interface Database {
  product: ProductTable;
  product_image: ProductImageTable;
}
