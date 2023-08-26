import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/services/cart.service";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { IProduct } from "@/lib/shopify/interfaces";

interface ProductDetailsProps {
  product: IProduct;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { mutate: createCart, isLoading } = useAddToCart();
  const [activeVariantId, setActiveVariantId] = useState("");

  const addToCart = () => {
    createCart({
      itemId: activeVariantId,
      quantity,
    });
  };

  const handleSetQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);

    if (value < 1) {
      value = 1;
    }

    setQuantity(value);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(quantity - 1);
  };

  return (
    <div className="flex-1 shrink-0 flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        {product.tags?.map((tag) => (
          <p className="bg-secondary py-2 rounded-md px-4 text-xs" key={tag}>
            {tag}
          </p>
        ))}
      </div>
      <h1 className="text-2xl lg:text-4xl font-extrabold tracking-wide">
        {product.title}
      </h1>

      <p>Variants</p>

      <div className="flex flex-wrap items-center gap-4">
        {product.variants?.nodes.map((variant) => (
          <Toggle
            key={variant.id}
            variant="outline"
            onPressedChange={() => setActiveVariantId(variant.id)}
            pressed={variant.id === activeVariantId}
          >
            {variant.title}
          </Toggle>
        ))}
      </div>

      <p>Quantity</p>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={handleDecreaseQuantity}
          disabled={quantity === 1}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Input
          className="max-w-[100px] text-center"
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={handleSetQuantity}
        />
        <Button variant="outline" onClick={handleIncreaseQuantity}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div>
        <Button
          onClick={addToCart}
          disabled={!activeVariantId}
          isLoading={isLoading}
        >
          {!isLoading && <ShoppingCart className="w-4 h-4" />}
          Add to cart
        </Button>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            <div
              className="prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml ?? "",
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
