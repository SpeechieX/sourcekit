/*

Written By Erik HR Copyright AroiTech 2020
Server Code for React x GraphQL x Node x MongoDB Testing.

 */

const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/userSchemas");
const cors = require("cors");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
const { GraphQLBoolean } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");

const app = express();

app.disable("x-powered-by"); // Protects from Attackers trying to detect Express
app.use("*", cors());
app.use(helmet());

app.use(
  bodyParser.json({
    extended: true,
  })
);

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
  }),
  graphqlExpress({ schema })
);

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// mongoose.connect(
//   // Connect to DB via ENV
//   process.env.DB_CONNECTION,
//   { useNewUrlParser: true },
//   () => console.log("Sprinking a little black magic...")
// );

require("dotenv/config");
// Mongoose x MLAB
mongoose
  .connect(process.env.DB_CONNECTION, {
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true,
  })
  .then(() => console.log("Sprinking a little black magic..."))
  .catch((err) => console.error(err));

const PORT = process.env.POR || 5000;

app.listen(PORT, () => console.log("Server Running!"));
