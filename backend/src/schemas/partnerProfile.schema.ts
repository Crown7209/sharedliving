import gql from "graphql-tag";

export const partnerProfileSchema = gql`
  enum LifestyleEnum {
    CLEAN
    MESSY
    QUIET
    SOCIAL
    PET_FRIENDLY
    NO_PETS
    SMOKER
    NON_SMOKER
    EARLY_BIRD
    NIGHT_OWL
    VEGETARIAN
    NON_VEGETARIAN
    WORK_FROM_HOME
    OUT_OF_HOME
    INTROVERT
    EXTROVERT
    MUSIC_LOVER
    PARTY_FRIENDLY
    RELIGIOUS
    NON_RELIGIOUS
  }

  enum GenderPreferenceEnum {
    MALE
    FEMALE
    ANY
  }

  type PartnerProfile {
    id: ID!
    userId: ID!
    user: User
    targetPropertyId: ID
    preferredLocation: String
    budgetMin: Float
    budgetMax: Float
    moveInDate: String
    stayDurationMonths: Int
    roommateCount: Int
    genderPreference: GenderPreferenceEnum
    lifestyle: [LifestyleEnum!]
    about: String
    isLookingForPartner: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreatePartnerProfileInput {
    userId: ID!
    targetPropertyId: ID
    preferredLocation: String
    budgetMin: Float
    budgetMax: Float
    moveInDate: String
    stayDurationMonths: Int
    roommateCount: Int
    genderPreference: GenderPreferenceEnum
    lifestyle: [LifestyleEnum!]
    about: String
    isLookingForPartner: Boolean
  }

  input UpdatePartnerProfileInput {
    id: ID!
    targetPropertyId: ID
    preferredLocation: String
    budgetMin: Float
    budgetMax: Float
    moveInDate: String
    stayDurationMonths: Int
    roommateCount: Int
    genderPreference: GenderPreferenceEnum
    lifestyle: [LifestyleEnum!]
    about: String
    isLookingForPartner: Boolean
  }

  type PartnerProfileResponse {
    success: Boolean!
    message: String!
    profile: PartnerProfile
  }

  type PartnerProfilesResponse {
    success: Boolean!
    message: String!
    profiles: [PartnerProfile!]!
    totalCount: Int!
  }

  extend type Query {
    getPartnerProfiles: PartnerProfilesResponse
    getPartnerProfile(id: ID!): PartnerProfileResponse
    getPartnerProfilesByUser(userId: ID!): PartnerProfilesResponse
  }

  extend type Mutation {
    createPartnerProfile(
      input: CreatePartnerProfileInput!
    ): PartnerProfileResponse
    updatePartnerProfile(
      input: UpdatePartnerProfileInput!
    ): PartnerProfileResponse
    deletePartnerProfile(id: ID!): PartnerProfileResponse
  }
`;
