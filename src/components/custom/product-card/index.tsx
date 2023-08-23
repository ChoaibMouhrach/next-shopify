import { IProduct } from "@/lib/shopify/interfaces";
import Image from "next/image";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="border group flex flex-col border-muted rounded-md cursor-pointer"
    >
      <div className="h-60 relative">
        {product.images.nodes[1]?.url && (
          <Image
            src={product.images.nodes[1].url}
            priority={true}
            fill={true}
            className="object-contain absolute !h-4/5 !w-4/5 m-auto group-hover:scale-110 animate duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt=""
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full rounded bg-background group-hover:opacity-0 animate duration-300" />
        <Image
          src={product.images.nodes[0]?.url}
          className="object-contain absolute !h-4/5 !w-4/5 m-auto  group-hover:opacity-0 animate duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          fill={true}
          alt=""
        />
      </div>
      <div className="border-t border-muted p-4 flex flex-col gap-4 flex-1">
        <p className="flex-1 group-hover:underline">{product.title}</p>
        <p className="text-sm">$ {product.priceRange.minVariantPrice.amount}</p>
      </div>
    </div>
  );
}
