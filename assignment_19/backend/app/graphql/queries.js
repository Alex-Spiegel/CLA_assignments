const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");
const { ChallengeType, CoderType } = require("./types");
const resolvers = require("./resolvers");

//====================================================
// GET all CATEGORIES - Gibt eine Liste aller vorhandenen Kategorien zurück (keine Challenges)
//====================================================
const getAllCategories = {
  type: new GraphQLList(GraphQLString), // Eine Liste von Strings (Kategorien)
  resolve: resolvers.getAllCategories, // Resolver ausgelagert
};

//====================================================
// GET /challenges/categories  - Gibt eine Liste von Challenges zurück
//====================================================
const getChallengesByCategory = {
  type: new GraphQLList(ChallengeType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: resolvers.getChallengesByCategory, // Resolver ausgelagert
};

//====================================================
// GET /challenges/id - get CHALLENGES by ID
//====================================================
const getChallengeById = {
  type: ChallengeType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: resolvers.getChallengeById, // Resolver ausgelagert
};

//====================================================
// GET get my profile
//====================================================
const getMyProfile = {
  type: CoderType,
  resolve: resolvers.getMyProfile, // Resolver ausgelagert
};

module.exports = {
  getAllCategories,
  getChallengesByCategory,
  getChallengeById,
  getMyProfile,
};
