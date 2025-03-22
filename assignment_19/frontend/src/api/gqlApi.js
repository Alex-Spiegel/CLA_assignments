import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

export const gqlApi = createApi({
  reducerPath: "api",
  baseQuery: graphqlRequestBaseQuery({
    url: "http://localhost:5000/graphql", // GraphQL-API-URL
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token; // Token aus dem Redux-Store abrufen
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // 1. Alle Kategorien abrufen
    getAllCategories: builder.query({
      query: () => ({
        document: `
          query {
            getAllCategories
          }
        `,
      }),
    }),

    // 2. Alle Challenges abrufen (mit Kategorie-Filter)
    getChallengesByCategory: builder.query({
      query: ({ category }) => ({
        document: `
            query GetChallenges($category: String) {
              getChallengesByCategory(category: $category){
                _id
                title
                category
                level
                solution_rate
                status {
                  coder_id
                  status
                }
              }
            }
          `,
        variables: { category }, // Kategorie als Variable übergeben
      }),
    }),

    // 3. Challenge nach ID abrufen (für Coding-Workspace)
    getChallengeById: builder.query({
      query: ({ id }) => ({
        document: `
          query GetChallenge($id: ID!) {
            getChallengeById(id: $id) {
              _id
              title
              category
              level
              description
              code {
                function_name
                code_text {
                  language
                  text
                }
                inputs {
                  name
                  type
                }
              }
              tests {
                weight
                inputs {
                  name
                  value
                }
                output
              }              
            }
          }
        `,
        variables: { id }, // Challenge-ID als Variable übergeben
      }),
    }),

    // 4. Login für Coder
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        document: `
        mutation LoginUser($email: String!, $password: String!) {
          loginUser(email: $email, password: $password)
        }
      `,
        variables: { email, password },
      }),
    }),

    // 5. Get Coder Profile
    getMyProfile: builder.query({
      query: () => ({
        document: `
          query {
            getMyProfile {
              first_name
              last_name
              avatar
            }
          }
        `,
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetChallengesByCategoryQuery,
  useGetChallengeByIdQuery,
  useLoginUserMutation,
  useGetMyProfileQuery,
} = gqlApi;
