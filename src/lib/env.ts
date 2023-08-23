import { z } from "zod";

const schema = z.object({
  SHOPIFY_STOREFRONT_TOKEN: z.string().nonempty(),
  SHOPIFY_STOREFRONT_API_URL: z.string().nonempty(),
});

export default schema.parse(process.env);
