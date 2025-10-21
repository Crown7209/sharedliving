import gql from "graphql-tag";

export const partnerMatchSchema = gql`
  enum PartnerMatchStatusEnum {
    PENDING
    MATCHED
    DECLINED
  }

  type PartnerMatch {
    id: ID!
    userAId: ID!
    userBId: ID!
    propertyId: ID
    status: PartnerMatchStatusEnum!
    createdAt: String!
    updatedAt: String!
  }

  input CreatePartnerMatchInput {
    userAId: ID!
    userBId: ID!
    propertyId: ID
    status: PartnerMatchStatusEnum
  }

  input UpdatePartnerMatchInput {
    id: ID!
    status: PartnerMatchStatusEnum!
  }

  type PartnerMatchResponse {
    success: Boolean!
    message: String!
    match: PartnerMatch
  }

  type PartnerMatchesResponse {
    success: Boolean!
    message: String!
    matches: [PartnerMatch!]!
    totalCount: Int!
  }

  extend type Query {
    getPartnerMatch(id: ID!): PartnerMatchResponse
    getPartnerMatchesByUser(userId: ID!): PartnerMatchesResponse
    getPartnerMatchesByProperty(propertyId: ID!): PartnerMatchesResponse
  }

  extend type Mutation {
    createPartnerMatch(input: CreatePartnerMatchInput!): PartnerMatchResponse
    updatePartnerMatch(input: UpdatePartnerMatchInput!): PartnerMatchResponse
    deletePartnerMatch(id: ID!): PartnerMatchResponse
  }
`;
