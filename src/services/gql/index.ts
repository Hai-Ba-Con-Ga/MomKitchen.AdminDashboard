import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(import.meta.env.SERVER_GQL_URL, {
  credentials: "include",
});
