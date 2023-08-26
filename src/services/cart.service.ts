import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import {
  addToCartMutation,
  createCartMutation,
} from "@/lib/shopify/mutations/cart";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

// CREATE CARTE
interface CreateCartResponseData {
  data: {
    cartCreate: {
      cart: {
        id: string;
      };
    };
  };
}

const createCart = () => {
  return api<CreateCartResponseData>({
    data: {
      query: createCartMutation,
    },
  });
};

// ADD TO CART
interface AddToCartProps {
  itemId: string;
  quantity: number;
}

interface AddToCartResponseData {
  data: {
    cartLinesAdd: {
      cart: {
        id: string;
      };
      userErrors: [];
    };
  };
}

interface AddToCartResponseErrorData {
  data: {
    cartLinesAdd: {
      cart: {
        id: string;
      };
      userErrors: [
        {
          field: string[];
          message: string;
        },
      ];
    };
  };
}

const addToCart = async ({ itemId, quantity }: AddToCartProps) => {
  return api<AddToCartResponseData>({
    data: {
      query: addToCartMutation,
      variables: {
        cartId: localStorage.getItem("cartId"),
        lines: [
          {
            merchandiseId: itemId,
            quantity,
          },
        ],
      },
    },
  });
};

export const useAddToCart = () => {
  const { toast } = useToast();

  return useMutation<
    AxiosResponse<AddToCartResponseData>,
    AxiosError<AddToCartResponseErrorData>,
    AddToCartProps
  >({
    mutationFn: async ({ itemId, quantity }) => {
      let cartId = localStorage.getItem("cartId");

      if (!cartId) {
        const cart = await createCart();
        cartId = cart.data.data.cartCreate.cart.id;
        localStorage.setItem("cartId", cartId);
      }

      return addToCart({ itemId, quantity });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Item added to cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });
};
