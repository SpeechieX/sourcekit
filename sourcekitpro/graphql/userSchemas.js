/*

Written By Erik HR Copyright AroiTech 2020
Server Code for React x GraphQL x Node x MongoDB Testing.

 */

// var GraphQLDate = require("graphql-date");

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

var UserModel = require("../models/User");

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    avatar: {
      GraphQLString,
    },
    age: {
      GraphQLInt,
    },
    location: {
      GraphQLString,
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
      resolve: function () {
        const users = UserModel.find().exec();
        if (!users) {
          throw new Error("Oopsie. Something went wrong. Try again bro!");
        }
        return users;
      },
    },
    user: {
      type: userType,
      args: {
        id: {
          name: "id",
          type: GraphQLString,
        },
      },
      resolve: function (root, params) {
        const userDetails = UserModel.findById(params.id).exec();
        if (!userDetails) {
          throw new Error("Could not find who you were searching for");
        }
        return userDetails;
      },
    },
  }),
});

// CRUD Mutations

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    // Create

    addUser: {
      type: userType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
        avatar: {
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        location: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: function (root, params) {
        const userModel = new UserModel(params);
        const newUser = userModel.save();
        if (!newUser) {
          throw new Error("Error: User Error");
        }
        return newUser;
      },
    },

    // Update

    updateUser: {
      type: userType,
      args: {
        id: {
          name: "id",
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        location: {
          type: new GraphQLNonNull(GraphQLString),
        },
        avatar: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(root, params) {
        return UserModel.findByIdAndUpdate(
          params.id,
          {
            avatar: params.avatar,
            age: params.age,
            location: params.location,
          },
          function (err) {
            if (err) return err;
          }
        );
      },
    },

    // Remove / Delete

    removeUser: {
      type: userType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(root, params) {
        const remUser = UserModel.findByIdAndRemove(params.id).exec();
        if (!remUser) {
          throw new Error("Failed to Delete User");
        }
        return remUser;
      },
    },
  }),
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
