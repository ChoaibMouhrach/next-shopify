export interface IImage {
  url: string;
}

export interface IProduct {
  id: string;
  title: string;
  images: {
    nodes: IImage[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
    maxVariantPrice: {
      amount: string;
    };
  };
}
