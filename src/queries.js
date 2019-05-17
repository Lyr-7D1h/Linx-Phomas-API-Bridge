const UPDATE_TITLE = `
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      userErrors {
        field
        message
      }
      product {
        id
        title
      }
    }
  }
`;
const APPEND_IMAGE = `
  mutation productAppendImages($input: ProductAppendImagesInput!) {
    productAppendImages(input: $input) {
      userErrors {
        field
        message
      }
      product {
        id
        title
      }
      newImages(scale: 1) {
        id
      }
    }
  }
`;
const GET_PRODUCTS_BY_ID = `
  query getProducts($id: ID!) {
    node(id: $id) {
      ... on Product {
        title
        id
      }
    }
  }
`;
const GET_SHOP = `
  query {
    shop {
      id
      name
      email
    }
  }
`;

module.exports = {
  UPDATE_TITLE,
  GET_PRODUCTS_BY_ID,
  GET_SHOP,
  APPEND_IMAGE
};
