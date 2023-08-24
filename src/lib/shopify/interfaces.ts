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

export interface IQuery extends Record<string, string | undefined> {}

export interface IVariables {
  first?: number;
  sortKey?: string;
  reverse?: boolean;
  query?: IQuery;
}
