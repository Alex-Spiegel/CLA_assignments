const { GraphQLString } = require("graphql");
const resolvers = require("./resolvers");

const loginUser = {
  type: GraphQLString, // Token als Rückgabewert
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: resolvers.loginUser, // Ausgelagerter Resolver
};

module.exports = { loginUser };
