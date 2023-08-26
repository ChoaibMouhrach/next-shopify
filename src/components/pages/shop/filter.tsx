import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { UseGetProductsVariables } from "@/services/product.service";
import { Save } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface FilterProps {
  variables: UseGetProductsVariables;
  setVariables: React.Dispatch<React.SetStateAction<UseGetProductsVariables>>;
}

export function Filter({ variables, setVariables }: FilterProps) {
  const [price, setPrice] = useState({
    min: 0,
    max: 99999999999,
  });

  const handleSort = (sortKey: string) => {
    setVariables({
      ...variables,
      sortKey,
    });
  };

  const handleOrder = (order: "asc" | "desc") => {
    setVariables({
      ...variables,
      reverse: order === "asc" ? false : true,
    });
  };

  const handleMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPrice({
      ...price,
      min: Number(value),
    });
  };

  const handleMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    if (value === "" || value === "") {
      value = "99999999999";
    }

    setPrice({
      ...price,
      max: Number(value),
    });
  };

  const handlePrice = () => {
    setVariables({
      ...variables,
      query: {
        ...variables.query,
        "variants.price": `>=${price.min} variants.price:<=${price.max}`,
      },
    });
  };

  return (
    <div className="sticky top-4 border border-muted p-4 rounded-md flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Select onValueChange={handleSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TITLE">Title</SelectItem>
            <SelectItem value="PRICE">Price</SelectItem>
            <SelectItem value="BEST_SELLING">Best Selling</SelectItem>
            <SelectItem value="RELEVANCE">Relevance</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleOrder}>
          <SelectTrigger>
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Asc</SelectItem>
            <SelectItem value="desc">Desc</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <div className="flex items-center gap-4">
        <Input
          onChange={handleMinPrice}
          value={price.min}
          min="1"
          type="number"
          placeholder="Min price"
        />
        <Input
          onChange={handleMaxPrice}
          value={price.max}
          min="1"
          type="number"
          placeholder="Max price"
        />
      </div>
      <Button onClick={handlePrice}>
        <Save className="w-4 h-4" />
        Apply
      </Button>
    </div>
  );
}
