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
      <main className="container py-8">
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <ProductCarousel product={product} />
          <ProductDetails product={product} />
        </div>
      </main>
    </>
  );
}
