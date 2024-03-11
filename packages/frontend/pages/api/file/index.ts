import { NextApiRequest, NextApiResponse } from "next";
import { s3Upload } from "@/lib/awsLib";
import { Formidable } from "formidable";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const [fields, files] = parsed;

  const formData = await req.formData();

  //   const files = formData.getAll("file") as File[];

  //   const keys = await Promise.all(files.map((file) => s3Upload(file)));

  res.status(200).json(keys);
}

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return POST(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
