import api from "@/lib/api";
import { IProduct, IQuery, IVariables } from "@/lib/shopify/interfaces";
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

const prepareQuery = (query: IQuery): string => {
  if (!query) return "";

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

export interface UseGetProductsVariables
  extends Required<
    Pick<IVariables, "query" | "first" | "reverse" | "sortKey">
  > {}

export const useGetProducts = (variables: UseGetProductsVariables) => {
  return useQuery<AxiosResponse<UseGetProductsResponseBody>>({
    queryKey: ["products", variables],
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
