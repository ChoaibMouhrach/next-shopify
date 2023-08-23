import env from "@/lib/env";
import axios from "axios";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { body: data } = req;

  const response = await axios({
    url: env.SHOPIFY_STOREFRONT_API_URL,
    headers: {
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_TOKEN,
    },
    data,
  });

  return res.status(response.status).json(response.data);
};

export default handler;
