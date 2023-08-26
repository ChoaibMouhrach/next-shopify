import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import {
  addToCartMutation,
  createCartMutation,
} from "@/lib/shopify/mutations/cart";
import { useMutation } from "@tanstack/react-query";

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

interface addToCartProps {
  itemId: string;
  quantity: number;
}

const addToCart = ({ itemId, quantity }: addToCartProps) => {
  return api({
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

  return useMutation({
    mutationFn: async ({ itemId, quantity }: addToCartProps) => {
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
      });
    },
  });
};
