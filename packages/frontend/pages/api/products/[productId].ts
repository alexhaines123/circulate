import { NextApiRequest, NextApiResponse } from "next";

import { getProduct } from "@/api/products";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const product = await getProduct(req.query.productId as string);
  res.status(200).json(product);
}
