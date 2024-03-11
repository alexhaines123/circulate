import { NextApiRequest, NextApiResponse } from "next";

import { createProduct, getProducts } from "@/api/products";
import { formSchema } from "@/components/forms/products/create/validation";
import { ZodError } from "zod";
import { s3Upload } from "@/lib/awsLib";

export type State =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
    }
  | null;

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const product = await createProduct(req.body);

  res.status(200).json(product);
}

export async function GET(_: NextApiRequest, res: NextApiResponse) {
  const products = await getProducts();
  res.status(200).json(products);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return POST(req, res);
  }
  if (req.method === "GET") {
    return GET(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
}
