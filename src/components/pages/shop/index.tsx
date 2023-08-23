import { Input } from "@/components/ui/input";
import { useGetProducts } from "@/services/product.service";
import { ChangeEvent, useCallback, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonProductCard from "@/components/custom/product-card/skeleton";
import ProductCard from "@/components/custom/product-card";
import { debounce } from "@/lib/utils";

export default function ShopPage() {
  const [title, setTitle] = useState<string>("");
  const { data, isLoading, isSuccess, isFetching, refetch } = useGetProducts({
    productsCount: 20,
    query: {
      title: title ? `*${title}*` : undefined,
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    }),
    [],
  );

  return (
    <div className="container py-4 flex items-stretch gap-4 shrink-0">
      <div className="flex-1 max-w-xs shrink-0 hidden lg:block relative">
        {isSuccess && (
          <div className="sticky top-4 border border-muted p-4 rounded-md">
            Filter
          </div>
        )}
        {isLoading && (
          <Skeleton className="sticky top-4 border border-muted p-8 rounded-md" />
        )}
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {isSuccess && (
          <div className="flex items-stretch gap-4">
            <Input placeholder="Search" onChange={handleSearch} />
            <Button
              variant="secondary"
              className="shrink-0"
              isLoading={isFetching}
              onClick={() => refetch()}
            >
              {!isFetching && <RefreshCcw className="w-4 h-4" />}
            </Button>
          </div>
        )}
        {isLoading && <Skeleton className="h-10 border border-muted" />}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
          {isSuccess &&
            data.data.data.products.nodes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          {isLoading &&
            [...Array(20)].map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
