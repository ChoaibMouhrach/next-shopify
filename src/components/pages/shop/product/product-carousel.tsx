import { IProduct } from "@/lib/shopify/interfaces";
import Image from "next/image";

interface ProductCarouselProps {
  product: IProduct;
}

export function ProductCarousel({ product }: ProductCarouselProps) {
  return (
    <div className=" flex-1 max-w-md shrink-0 flex flex-col gap-4">
      {product.images.nodes.map((image) => (
        <div key={image.url} className="h-96 relative bg-secondary rounded-md">
          <Image
            src={image.url}
            fill={true}
            className="object-contain rounded-md absolute !w-4/5 !h-4/5 m-auto"
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
