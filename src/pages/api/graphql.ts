import shopifyApi from "@/lib/shopify/api";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { body: data } = req;

  const response = await shopifyApi({
    data,
  });

  let status: number = response.status;

  if (
    response.data.errors ||
    response.data?.data?.cartLinesAdd?.userErrors?.length
  ) {
    status = 400;
  }

  return res.status(status).json(response.data);
};

export default handler;
