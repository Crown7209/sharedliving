import { mergeTypeDefs } from "@graphql-tools/merge";
import gql from "graphql-tag";
import { userSchema } from "./user.schema";
import { propertySchema } from "./property.schema";
import { partnerProfileSchema } from "./partnerProfile.schema";
import { partnerMatchSchema } from "./partnerMatch.schema";
import { partnerInterestSchema } from "./partnerInterest.schema";

const baseSchema = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = mergeTypeDefs([
  baseSchema,
  userSchema,
  propertySchema,
  partnerProfileSchema,
  partnerMatchSchema,
  partnerInterestSchema,
]);
