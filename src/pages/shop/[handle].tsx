import PublicLayout from "@/components/layouts/public";
import ProductPage from "@/components/pages/shop/product";
import shopifyApi from "@/lib/shopify/api";
import { IProduct } from "@/lib/shopify/interfaces";
import { getProductQuery } from "@/lib/shopify/queries/products";
import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  return (
    <PublicLayout>
      <ProductPage product={product} />
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { handle } = ctx.params!;

  let response: AxiosResponse;

  try {
    response = await shopifyApi({
      data: {
        query: getProductQuery,
        variables: {
          handle,
        },
      },
    });

    if (!response.data.data.product) {
      return {
        redirect: {
          destination: "/404",
          permanent: true,
        },
      };
    }
  } catch (err) {
    return {
      redirect: {
        destination: "/500",
        permanent: true,
      },
    };
  }

  return {
    props: {
      product: response.data.data.product,
    },
  };
};
