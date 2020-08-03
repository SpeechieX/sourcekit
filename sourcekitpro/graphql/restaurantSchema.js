/*

Written By Erik HR Copyright AroiTech 2020
Server Code for React x GraphQL x Node x MongoDB Testing.

 */

import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { prepare } from "../util/index";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

const homePath = "/graphiql";
const PORT = 7000;
const MONGO_URL = "mongodb://128.199.136.149:5546/GoTeddy";

var tunnel = require("tunnel-ssh");

var config = {
  agent: "paqux38",
  host: "128.199.136.149",
  Password: "pay1919",
  port: 21,
  dstPort: 5546,
  localPort: PORT,
  keepAlive: true,
};

export const start = async () => {
  try {
    // const db = await MongoClient.connect(MONGO_URL);
    var server = tunnel(config, function (error, server) {
      if (error) {
        console.log("DB ERROR");
      }
      mongoose.connect(MONGO_URL);
      var db = mongoose.connection;
      db.on("error", console.error.bind(console, "Connection Error"));
      db.once("open", () => {
        console.log("Successful Connection");
      });

      const Restaurants = db.collection("restaurant");
      const Orders = db.collection("order");
      // const Riders = db.collection('driver')

      const typeDefs = [
        `
            type Query {
                restaurant(_id: String): Restaurant
                restaurants: [Restaurant]
                order(_id: String): Order
                Orders: [Order]
                location(_id: String): Location
                Locations: [Location]
                customers(_id: String): Customer
                Customers: [Customer]
            }

            
            type Restaurant {
              _id: String
              restaurant_status_active: String
              location: Location
            }
            
            type Order {
                _id: String
                analytic: Customer
                restaurant: Restaurant
                order_short_no: String
            }

            type Location {
              id: String
              latitude: String
              longitude: String
            }

            type Customer {
              location: String
              name: String
              phone_number: String
            }


            schema {
                query: Query
            }
        `,
      ];

      const resolvers = {
        // TODO: Add Resolvers
        Query: {
          restaurant: async (root, { _id }) => {
            return prepare(await Restaurants.findOne(ObjectId(_id)));
          },
          restaurants: async () => {
            return prepare(await Restaurants.find({}).toArray()).map(prepare);
          },
          order: async (root, { _id }) => {
            return prepare(await Orders.findOne(ObjectId(_id)));
          },
          // orders: async () => {
          //   return prepare(await Orders.find({}).toArray()).map(prepare);
          // },
        },
        Restaurant: {
          location: async ({ _id }) => {
            return (await Location.find({ locationid: _id }).toArray()).map(
              prepare
            );
          },
        },
        Order: {
          restaurant: async ({ restaurantId }) => {
            return prepare(await postMessage.findOne(ObjectId(restaurantId)));
          },
        },
      };

      const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
      });

      app.use("/graphiql", bodyParser.json(), gql({ schema }));

      app.use(
        homePath,
        gql({
          endpointURL: "/graphiql",
        })
      );

      app.listen(PORT, () => {
        console.log(`Test Server Running on Port ${PORT}`);
      });
    });
  } catch (e) {
    console.log(e);
  }
};
