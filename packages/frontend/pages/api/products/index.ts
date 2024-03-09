import { NextApiRequest, NextApiResponse } from "next";

import { createProduct, getProducts } from "@/api/products";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const product = await createProduct(req.body);

  res.status(200).json(product);
}

export async function GET(_: NextApiRequest, res: NextApiResponse) {
  const products = await getProducts();
  res.status(200).json(products);
}
