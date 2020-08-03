const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLBoolean,
} = require("graphql");

// Launch Type A Which is a Model Type

const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: {
      type: GraphQLString,
    },
    rocket_name: {
      type: GraphQLString,
    },
    rocket_type: {
      type: GraphQLString,
    },
    launch_year: {
      type: GraphQLInt,
    },
    launch_date_local: {
      type: GraphQLString,
    },
    launch_success: {
      type: GraphQLBoolean,
    },
    rocket: {
      type: RocketType,
    },
  }),
});

// Root

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        // Hotspot of Data Fetching

        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then((res) => res.data);
      },
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`);
      },
    },
  },
});

// module.exports = new GraphQLSchema({
//   query: RootQuery,
// });
