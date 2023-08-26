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
        handle
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

export const getProductQuery = /* GraphQL */ `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      title
      tags
      seo {
        description
        title
      }
      images(first: 6) {
        nodes {
          url
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          price {
            amount
          }
          image {
            url
          }
        }
      }
      descriptionHtml
    }
  }
`;
