import { IProduct } from "@/lib/shopify/interfaces";
import Head from "next/head";
import { ProductCarousel } from "./product-carousel";
import { ProductDetails } from "./product-details";

interface ProductPageProps {
  product: IProduct;
}

export default function ProductPage({ product }: ProductPageProps) {
  return (
    <>
      <Head>
        <title>{product.seo?.title ?? product.title}</title>
        <meta name="description" content={product.seo?.description} />
      </Head>
      <main className="flex flex-col-reverse md:flex-row container gap-8 py-8">
        <ProductCarousel product={product} />
        <ProductDetails product={product} />
      </main>
    </>
  );
}
