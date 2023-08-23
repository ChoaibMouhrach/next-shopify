import api from "@/lib/api";
import { IProduct } from "@/lib/shopify/interfaces";
import { getProductsQuery } from "@/lib/shopify/queries/products";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface UseGetProductsResponseBody {
  data: {
    products: {
      nodes: IProduct[];
    };
  };
}

type Variables = {
  productsCount: number;
  query: Record<string, string | undefined>;
};

const prepareQuery = (query: Record<string, string | undefined>): string => {
  const queryObject: Record<string, string> = {};

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      queryObject[key] = value;
    }
  });

  return Object.entries(queryObject)
    .map(([key, value]) => `${key}:${value}`)
    .join(" ");
};

export const useGetProducts = (variables: Variables) => {
  return useQuery<AxiosResponse<UseGetProductsResponseBody>>({
    queryKey: ["products", ...Object.values(variables)],
    keepPreviousData: true,
    queryFn: () => {
      return api({
        data: {
          query: getProductsQuery,
          variables: {
            ...variables,
            query: prepareQuery(variables.query),
          },
        },
      });
    },
  });
};
