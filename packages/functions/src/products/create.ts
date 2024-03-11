import * as uuid from "uuid";
import handler from "@notes/core/handler";
import {
  createProduct,
  createProductImage,
} from "@notes/core/rds/repository/product";

export const main = handler(async (event) => {
  let data = {
    title: "",
    description: "",
    price: "",
    images: [],
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

  const product = await createProduct(params);

  const productImagesParams = data.images.map((image: { key: string }) => ({
    product_image_id: uuid.v1(),
    product_id: product.product_id,
    key: image.key,
  }));

  const productImages = await createProductImage(productImagesParams);

  const result = {
    product,
    product_images: productImages,
  };

  return JSON.stringify(result);
});
