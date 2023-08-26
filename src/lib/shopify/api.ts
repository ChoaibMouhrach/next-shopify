import axios from "axios";
import env from "../env";

const shopifyApi = axios.create({
  baseURL: env.SHOPIFY_STOREFRONT_API_URL,
  method: "POST",
  headers: {
    "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_TOKEN,
  },
});

export default shopifyApi;
