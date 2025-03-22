const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const {
  getAllCategories,
  getChallengeById,
  getChallengesByCategory,
  getMyProfile,
} = require("./queries");
const { loginUser } = require("./mutations"); // importieren

// Root Query definieren
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllCategories,
    getChallengesByCategory,
    getChallengeById,
    getMyProfile,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    loginUser, // Mutation einbinden
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
