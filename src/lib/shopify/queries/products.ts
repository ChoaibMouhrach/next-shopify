export const getProductsQuery = /* GraphQL */ `
  query GetProducts(
    $first: Int!
    $query: String!
    $sortKey: ProductSortKeys
    $reverse: Boolean
  ) {
    products(
      first: $first
      query: $query
      sortKey: $sortKey
      reverse: $reverse
    ) {
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
