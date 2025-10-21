import gql from "graphql-tag";

export const partnerInterestSchema = gql`
  enum InterestStatusEnum {
    INTERESTED
    SKIPPED
  }

  type PartnerInterest {
    id: ID!
    userId: ID!
    targetUserId: ID!
    propertyId: ID
    status: InterestStatusEnum!
    createdAt: String!
    updatedAt: String!
  }

  input CreatePartnerInterestInput {
    userId: ID!
    targetUserId: ID!
    propertyId: ID
    status: InterestStatusEnum!
  }

  input UpdatePartnerInterestInput {
    id: ID!
    status: InterestStatusEnum!
  }

  type PartnerInterestResponse {
    success: Boolean!
    message: String!
    interest: PartnerInterest
    matchCreated: Boolean
    match: PartnerMatch
  }

  type PartnerInterestsResponse {
    success: Boolean!
    message: String!
    interests: [PartnerInterest!]!
    totalCount: Int!
  }

  extend type Query {
    getPartnerInterest(id: ID!): PartnerInterestResponse
    getPartnerInterestsByUser(userId: ID!): PartnerInterestsResponse
    getPartnerInterestsByTarget(targetUserId: ID!): PartnerInterestsResponse
    checkMutualInterest(userAId: ID!, userBId: ID!): PartnerInterestResponse
  }

  extend type Mutation {
    createPartnerInterest(
      input: CreatePartnerInterestInput!
    ): PartnerInterestResponse
    updatePartnerInterest(
      input: UpdatePartnerInterestInput!
    ): PartnerInterestResponse
    deletePartnerInterest(id: ID!): PartnerInterestResponse
  }
`;
