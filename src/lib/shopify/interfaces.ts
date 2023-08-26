export interface IImage {
  url: string;
}

export interface IProduct {
  handle: string;
  title: string;
  descriptionHtml?: string;
  tags?: string[];
  images: {
    nodes: IImage[];
  };
  variants?: {
    nodes: IVariant[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
    maxVariantPrice: {
      amount: string;
    };
  };
  seo?: {
    description: string;
    title: string;
  };
}

export interface IQuery extends Record<string, string | undefined> {}

export interface IVariables {
  first?: number;
  sortKey?: string;
  reverse?: boolean;
  query?: IQuery;
}

export interface IVariant {
  id: string;
  title: string;
  price: {
    amount: string;
  };
  image: {
    url: string;
  };
}
