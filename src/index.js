const restify = require("restify");
const gql = require("gql-tag");
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;
const { request, GraphQLClient } = require("graphql-request");

const PORT = 8080;
const SHOPIFY_ENDPOINT =
  "https://phomas-demo.myshopify.com/admin/api/2019-04/graphql.json";

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

const server = restify.createServer({
  title: "Linx Superior API"
});

const client = new GraphQLClient(SHOPIFY_ENDPOINT, {
  headers: {
    "X-Shopify-Access-Token": SHOPIFY_API_SECRET_KEY
  }
});

server.get("/", (req, res, next) => {
  res.send("Welcome to the superior API");
});

// Used for req.authorization
// server.use(restify.plugins.authorizationParser());

// Used to pass query data in POST Request
server.use(restify.plugins.queryParser());

server.post("/title", (req, res) => {
  console.log(req.query);
  client
    .request(GET_PRODUCTS_BY_ID, { id: req.query.id })
    .then(data => {
      res.send(data);
    })
    .catch(err => res.send(err));
});

server.post("/update/title", (req, res) => {
  console.log(req.query);
  const productVariableInput = {
    id: req.query.id,
    title: req.query.title
  };
  client
    .request(UPDATE_TITLE, { input: productVariableInput })
    .then(data => {
      res.send(data);
    })
    .catch(err => res.send(err));
});

server.listen(PORT, () => console.log(`> Listening on ${PORT}`));
