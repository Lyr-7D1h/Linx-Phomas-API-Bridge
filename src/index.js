const restify = require("restify");
const gql = require("gql-tag");
const { request, GraphQLClient } = require("graphql-request");
const public = require("./public");
const phomas = require("./phomas");
const queries = require("./queries");
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

const PORT = 8080;
const SHOPIFY_ENDPOINT =
  "https://phomas-demo.myshopify.com/admin/api/2019-04/graphql.json";

const server = restify.createServer({
  title: "Linx Superior API"
});

const client = new GraphQLClient(SHOPIFY_ENDPOINT, {
  headers: {
    "X-Shopify-Access-Token": SHOPIFY_API_SECRET_KEY
  }
});

/**
 * ROUTES
 */
server.get("/", (req, res, next) => {
  res.send("Welcome to the superior API");
});

// Used to pass query data in POST Request
server.use(restify.plugins.queryParser());

// phomas.getImagesByID("3546670661710_1.jpg").then(data => {
//   console.log(data);
// });

// You get given a filename
server.post("/append/images", (req, res) => {
  // filename example: 3546670661710_1.jpg
  const filename = req.query.filename;
  const altText = req.query.alt_text;
  const productId = req.query.id;
  phomas.getImagesByID(filename).then(data => {
    public.writeImage(filename, data).then(filePath => {
      console.log("file created at " + filePath);

      const productAppendImagesInput = {
        id: productId,
        images: [
          {
            id: null,
            altText: altText,
            src: "https://9zfne.sse.codesandbox.io/images/" + filename
          }
        ]
      };
      client
        .request(queries.APPEND_IMAGE, { input: productAppendImagesInput })
        .then(data => {
          console.log("sending to Shopify");
          res.send(data);
        })
        .catch(err => res.send(err));
    });
  });
});

// STATIC CONTENT IMAGES
server.get(
  "/images/*",
  restify.plugins.serveStaticFiles("./public_images"),
  (req, res) => {
    console.log("Get " + req.url + " from " + req.connection.remoteAddress);
  }
);

// server.get("/shop", (req, res) => {
//   client
//     .request(queries.GET_SHOP)
//     .then(data => res.send(data))
//     .catch(err => res.send(err));
// });

// server.post("/title", (req, res) => {
//   client
//     .request(queries.GET_PRODUCTS_BY_ID, { id: req.query.id })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => res.send(err));
// });

// server.post("/update/title", (req, res) => {
//   const productVariableInput = {
//     id: req.query.id,
//     title: req.query.title
//   };
//   client
//     .request(queries.UPDATE_TITLE, { input: productVariableInput })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => res.send(err));
// });

server.listen(PORT, () => console.log(`> Listening on ${PORT}`));
