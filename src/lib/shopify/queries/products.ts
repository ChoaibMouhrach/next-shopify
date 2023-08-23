export const getProductsQuery = /* GraphQL */ `
  query GetProducts($productsCount: Int!, $query: String!) {
    products(first: $productsCount, query: $query) {
      nodes {
        id
        title
        priceRange {
          minVariantPrice {
            amount
          }
          maxVariantPrice {
            amount
          }
        }
        images(first: 2) {
          nodes {
            url
          }
        }
      }
    }
  }
`;
