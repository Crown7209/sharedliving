import gql from "graphql-tag";

export const userSchema = gql`
  enum UserRole {
    landlord
    renter
  }

  enum Gender {
    male
    female
    other
  }

  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    image: String
    bio: [String!]
    age: Int
    gender: Gender
    role: UserRole!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    phone: String
    password: String!
    image: String
    bio: [String!]
    age: Int
    gender: Gender
    role: UserRole!
  }

  input UpdateUserInput {
    id: ID!
    name: String
    email: String
    phone: String
    password: String
    image: String
    bio: [String!]
    age: Int
    gender: Gender
    role: UserRole
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type UserResponse {
    success: Boolean!
    message: String!
    user: User
    token: String
  }

  type UsersResponse {
    success: Boolean!
    message: String!
    users: [User!]!
    totalCount: Int!
  }

  extend type Query {
    getUser(id: ID!): UserResponse
    getUsers(limit: Int, offset: Int, role: UserRole): UsersResponse
    getUserProfile: UserResponse
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): UserResponse
    updateUser(input: UpdateUserInput!): UserResponse
    deleteUser(id: ID!): UserResponse
    login(input: LoginInput!): UserResponse
  }
`;
