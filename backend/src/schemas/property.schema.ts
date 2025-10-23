import gql from "graphql-tag";

export const propertySchema = gql`
  enum PropertyType {
    apartment
    house
    studio
    other
  }

  enum PrivacyType {
    entire_place
    private_room
    shared_room
  }

  type Location {
    city: String!
    district: String!
    address: String
    lat: Float
    lng: Float
  }

  type Host {
    id: ID!
    name: String!
    image: String
  }

  type Property {
    id: ID!
    title: String!
    description: String
    host: Host!
    location: Location!
    pricePerMonth: Float!
    roomCount: Int!
    shared: Boolean!
    maxRoommates: Int
    images: [String]
    amenities: [String]
    propertyType: PropertyType
    privacyType: PrivacyType
    availableFrom: String!
    availableTo: String!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input LocationInput {
    city: String
    district: String
    address: String
    lat: Float
    lng: Float
  }

  input CreatePropertyInput {
    title: String
    description: String
    hostId: ID!
    location: LocationInput
    pricePerMonth: Float
    roomCount: Int
    shared: Boolean
    maxRoommates: Int
    images: [String]
    amenities: [String]
    propertyType: PropertyType
    privacyType: PrivacyType
    availableFrom: String
    availableTo: String
    isActive: Boolean
  }

  input UpdatePropertyInput {
    id: ID!
    title: String
    description: String
    location: LocationInput
    pricePerMonth: Float
    roomCount: Int
    shared: Boolean
    maxRoommates: Int
    images: [String]
    amenities: [String]
    propertyType: PropertyType
    privacyType: PrivacyType
    availableFrom: String
    availableTo: String
    isActive: Boolean
  }

  input PropertySearchInput {
    city: String
    district: String
    minPrice: Float
    maxPrice: Float
    roomCount: Int
    shared: Boolean
    propertyType: PropertyType
    privacyType: PrivacyType
    amenities: [String]
    availableFrom: String
    availableTo: String
    isActive: Boolean
    limit: Int
    offset: Int
  }

  type PropertyResponse {
    success: Boolean!
    message: String!
    property: Property
  }

  type PropertiesResponse {
    success: Boolean!
    message: String!
    properties: [Property!]!
    totalCount: Int!
  }

  extend type Query {
    getProperty(id: ID!): PropertyResponse
    getProperties(limit: Int, offset: Int): PropertiesResponse
    searchProperties(input: PropertySearchInput!): PropertiesResponse
    getPropertiesByHost(
      hostId: ID!
      limit: Int
      offset: Int
    ): PropertiesResponse
  }

  extend type Mutation {
    createProperty(input: CreatePropertyInput!): PropertyResponse
    updateProperty(input: UpdatePropertyInput!): PropertyResponse
    deleteProperty(id: ID!): PropertyResponse
  }
`;
