import { NextApiRequest, NextApiResponse } from "next";

import { API, Storage } from "aws-amplify";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const product = await API.post("products", `/products`, { body: req.body });

  res.status(200).json(product);
}

export default handler;
