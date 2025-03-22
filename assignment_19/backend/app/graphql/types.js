const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");

//==================================================
// Manager-Type
//==================================================
const ManagerType = new GraphQLObjectType({
  name: "Manager",
  fields: () => ({
    _id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    avatar: { type: GraphQLString },
    role: { type: GraphQLString },
    is_verified: { type: GraphQLBoolean },

    challenges: { type: new GraphQLList(GraphQLID) }, // Referenzen auf Challenges als ID-Liste
  }),
});

//==================================================
// Coder-Type
//==================================================
const CoderType = new GraphQLObjectType({
  name: "Coder",
  fields: () => ({
    _id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    avatar: { type: GraphQLString },
    role: { type: GraphQLString },
    is_verified: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    score: { type: GraphQLInt },
    submissions: { type: new GraphQLList(GraphQLID) }, // Referenzen auf Submission
  }),
});

//==================================================
// der GESAMTE Challenge-Type - mit versch. Teilstücken
//==================================================

// 📌 Enum für Challenge-Level -> muss hier schon definiert werden weil unten darauf verwiesen wird
const ChallengeLevelEnum = new GraphQLEnumType({
  name: "ChallengeLevel",
  values: {
    Easy: { value: "Easy" },
    Moderate: { value: "Moderate" },
    Hard: { value: "Hard" },
  },
});

// 📌 Enum für Status der Challenge -> muss hier schon definiert werden weil unten darauf verwiesen wird
const ChallengeStatusEnum = new GraphQLEnumType({
  name: "ChallengeStatusEnum",
  values: {
    WAITING: { value: "WAITING" },
    ATTEMPTED: { value: "ATTEMPTED" },
    COMPLETED: { value: "COMPLETED" },
  },
});

// 📌 CodeBlock für die Challenge -> muss hier schon definiert werden weil unten darauf verwiesen wird
const CodeBlockType = new GraphQLObjectType({
  name: "CodeBlock",
  fields: () => ({
    function_name: { type: GraphQLString },
    code_text: {
      type: new GraphQLObjectType({
        name: "CodeText",
        fields: {
          language: { type: GraphQLString },
          text: { type: GraphQLString },
        },
      }),
    },
    inputs: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "CodeInput",
          fields: {
            name: { type: GraphQLString },
            type: { type: GraphQLString },
          },
        })
      ),
    },
  }),
});

// 📌 Test Cases für die Challenge -> muss hier schon definiert werden weil unten darauf verwiesen wird
const TestCaseType = new GraphQLObjectType({
  name: "TestCase",
  fields: () => ({
    weight: { type: GraphQLFloat },
    inputs: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "TestInput",
          fields: {
            name: { type: GraphQLString },
            value: { type: GraphQLString }, // GraphQL kennt `Mixed` nicht, daher als String
          },
        })
      ),
    },
    output: { type: GraphQLString }, // Auch hier `Mixed` als `String`
  }),
});

// 📌 Status für Coder in der Challenge -> muss hier schon definiert werden weil unten darauf verwiesen wird
const ChallengeStatusType = new GraphQLObjectType({
  name: "ChallengeStatusType",
  fields: {
    coder_id: { type: GraphQLID },
    status: { type: ChallengeStatusEnum },
  },
});

// ChallengeType - DAS EIGENTLICHE DING
const ChallengeType = new GraphQLObjectType({
  name: "Challenge",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    level: { type: ChallengeLevelEnum },
    manager: { type: GraphQLID },
    code: { type: CodeBlockType },
    tests: { type: new GraphQLList(TestCaseType) },
    solution_rate: { type: GraphQLFloat },
    status: { type: new GraphQLList(ChallengeStatusType) },
  }),
});

//==================================================
// Submission-Type
//==================================================
const SubmissionType = new GraphQLObjectType({
  name: "Submission",
  fields: () => ({
    _id: { type: GraphQLID },
    coder_id: { type: GraphQLID }, // Referenz auf Coder
    challenge_id: { type: GraphQLID }, // Referenz auf Challenge
    code: { type: GraphQLString },
    lang: { type: GraphQLString },
    passed: { type: GraphQLBoolean },
    score: { type: GraphQLFloat },
    submission_time: { type: GraphQLString }, // ISO-String für Datum
  }),
});

module.exports = { ManagerType, CoderType, ChallengeType, SubmissionType };
