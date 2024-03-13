import {
  createProduct,
  createProductImage,
  findProducts,
  getProduct,
} from "@notes/core/rds/repository/product";
import { z } from "zod";

import { randomUUID } from "crypto";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { procedure, router } from "../trpc";

export const productsRouter = router({
  productCreate: procedure
    .input(
      z.object({
        title: z.string().min(2, "Too short").max(100, "Too long"),
        description: z.string().min(10, "Too short"),
        price: z.number().min(0),
        product_images: z
          .array(
            z.object({
              key: z.string().url(),
            })
          )
          .min(1, "At least one image is required"),
      })
    )
    .mutation(async (opts) => {
      const {
        input: { product_images, ...product },
      } = opts;
      const newProduct = await createProduct({
        product_id: randomUUID(),
        ...product,
      });

      const productImagesParams = product_images.map((image) => ({
        product_image_id: randomUUID(),
        product_id: newProduct.product_id,
        key: image.key,
      }));

      const productImages = await createProductImage(productImagesParams);

      return {
        ...newProduct,
        product_images: productImages,
      };
    }),
  productList: procedure.query(async () => {
    const products = await findProducts({});
    return products;
  }),
  productGet: procedure
    .input(
      z.object({
        product_id: z.string(),
      })
    )
    .query(async (opts) => {
      const { product_id } = opts.input;
      const product = await getProduct({ product_id });
      console.log(opts.input, product_id, product[0]);
      if (!product[0]) {
        throw new Error("Product not found");
      }

      return product[0];
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof productsRouter;

export const main = awsLambdaRequestHandler({
  router: productsRouter,
  responseMeta() {
    return {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
  },
});
