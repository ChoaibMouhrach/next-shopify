import { IProduct } from "@/lib/shopify/interfaces";
import Head from "next/head";

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
      <main className="flex container gap-4 py-4">
        <div className="h-96 bg-red-700 flex-1 max-w-md shrink-0" />
        <div className="flex-1 shrink-0 flex flex-col gap-4">
          <div>{product.tags?.map((tag) => <p key={tag}>{tag}</p>)}</div>
          <h1 className="text-4xl font-semibold">{product.title}</h1>
          <p className="text-lg font-semibold">Description</p>
          <div
            className="prose max-w-none prose:text-white text-gray-300"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml ?? "" }}
          />
        </div>
      </main>
    </>
  );
}
