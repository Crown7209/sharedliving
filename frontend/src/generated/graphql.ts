import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreatePartnerInterestInput = {
  propertyId?: InputMaybe<Scalars['ID']['input']>;
  status: InterestStatusEnum;
  targetUserId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type CreatePartnerMatchInput = {
  propertyId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<PartnerMatchStatusEnum>;
  userAId: Scalars['ID']['input'];
  userBId: Scalars['ID']['input'];
};

export type CreatePartnerProfileInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  budgetMax?: InputMaybe<Scalars['Float']['input']>;
  budgetMin?: InputMaybe<Scalars['Float']['input']>;
  genderPreference?: InputMaybe<GenderPreferenceEnum>;
  isLookingForPartner?: InputMaybe<Scalars['Boolean']['input']>;
  lifestyle?: InputMaybe<Array<LifestyleEnum>>;
  moveInDate?: InputMaybe<Scalars['String']['input']>;
  preferredLocation?: InputMaybe<Scalars['String']['input']>;
  roommateCount?: InputMaybe<Scalars['Int']['input']>;
  stayDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  targetPropertyId?: InputMaybe<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};

export type CreatePropertyInput = {
  amenities?: InputMaybe<Array<Scalars['String']['input']>>;
  availableFrom: Scalars['String']['input'];
  availableTo: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  hostId: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  location: LocationInput;
  maxRoommates?: InputMaybe<Scalars['Int']['input']>;
  pricePerMonth: Scalars['Float']['input'];
  privacyType?: InputMaybe<PrivacyType>;
  propertyType?: InputMaybe<PropertyType>;
  roomCount: Scalars['Int']['input'];
  shared: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  bio?: InputMaybe<Array<Scalars['String']['input']>>;
  email: Scalars['String']['input'];
  gender?: InputMaybe<Gender>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role: UserRole;
};

export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
  OTHER = 'other'
}

export enum GenderPreferenceEnum {
  ANY = 'ANY',
  FEMALE = 'FEMALE',
  MALE = 'MALE'
}

export type Host = {
  __typename?: 'Host';
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export enum InterestStatusEnum {
  INTERESTED = 'INTERESTED',
  SKIPPED = 'SKIPPED'
}

export enum LifestyleEnum {
  CLEAN = 'CLEAN',
  EARLY_BIRD = 'EARLY_BIRD',
  EXTROVERT = 'EXTROVERT',
  INTROVERT = 'INTROVERT',
  MESSY = 'MESSY',
  MUSIC_LOVER = 'MUSIC_LOVER',
  NIGHT_OWL = 'NIGHT_OWL',
  NON_RELIGIOUS = 'NON_RELIGIOUS',
  NON_SMOKER = 'NON_SMOKER',
  NON_VEGETARIAN = 'NON_VEGETARIAN',
  NO_PETS = 'NO_PETS',
  OUT_OF_HOME = 'OUT_OF_HOME',
  PARTY_FRIENDLY = 'PARTY_FRIENDLY',
  PET_FRIENDLY = 'PET_FRIENDLY',
  QUIET = 'QUIET',
  RELIGIOUS = 'RELIGIOUS',
  SMOKER = 'SMOKER',
  SOCIAL = 'SOCIAL',
  VEGETARIAN = 'VEGETARIAN',
  WORK_FROM_HOME = 'WORK_FROM_HOME'
}

export type Location = {
  __typename?: 'Location';
  address?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  district: Scalars['String']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
};

export type LocationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  district: Scalars['String']['input'];
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createPartnerInterest?: Maybe<PartnerInterestResponse>;
  createPartnerMatch?: Maybe<PartnerMatchResponse>;
  createPartnerProfile?: Maybe<PartnerProfileResponse>;
  createProperty?: Maybe<PropertyResponse>;
  createUser?: Maybe<UserResponse>;
  deletePartnerInterest?: Maybe<PartnerInterestResponse>;
  deletePartnerMatch?: Maybe<PartnerMatchResponse>;
  deletePartnerProfile?: Maybe<PartnerProfileResponse>;
  deleteProperty?: Maybe<PropertyResponse>;
  deleteUser?: Maybe<UserResponse>;
  login?: Maybe<UserResponse>;
  updatePartnerInterest?: Maybe<PartnerInterestResponse>;
  updatePartnerMatch?: Maybe<PartnerMatchResponse>;
  updatePartnerProfile?: Maybe<PartnerProfileResponse>;
  updateProperty?: Maybe<PropertyResponse>;
  updateUser?: Maybe<UserResponse>;
};


export type MutationCreatePartnerInterestArgs = {
  input: CreatePartnerInterestInput;
};


export type MutationCreatePartnerMatchArgs = {
  input: CreatePartnerMatchInput;
};


export type MutationCreatePartnerProfileArgs = {
  input: CreatePartnerProfileInput;
};


export type MutationCreatePropertyArgs = {
  input: CreatePropertyInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeletePartnerInterestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePartnerMatchArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePartnerProfileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePropertyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdatePartnerInterestArgs = {
  input: UpdatePartnerInterestInput;
};


export type MutationUpdatePartnerMatchArgs = {
  input: UpdatePartnerMatchInput;
};


export type MutationUpdatePartnerProfileArgs = {
  input: UpdatePartnerProfileInput;
};


export type MutationUpdatePropertyArgs = {
  input: UpdatePropertyInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type PartnerInterest = {
  __typename?: 'PartnerInterest';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  propertyId?: Maybe<Scalars['ID']['output']>;
  status: InterestStatusEnum;
  targetUserId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type PartnerInterestResponse = {
  __typename?: 'PartnerInterestResponse';
  interest?: Maybe<PartnerInterest>;
  match?: Maybe<PartnerMatch>;
  matchCreated?: Maybe<Scalars['Boolean']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type PartnerInterestsResponse = {
  __typename?: 'PartnerInterestsResponse';
  interests: Array<PartnerInterest>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PartnerMatch = {
  __typename?: 'PartnerMatch';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  propertyId?: Maybe<Scalars['ID']['output']>;
  status: PartnerMatchStatusEnum;
  updatedAt: Scalars['String']['output'];
  userAId: Scalars['ID']['output'];
  userBId: Scalars['ID']['output'];
};

export type PartnerMatchResponse = {
  __typename?: 'PartnerMatchResponse';
  match?: Maybe<PartnerMatch>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum PartnerMatchStatusEnum {
  DECLINED = 'DECLINED',
  MATCHED = 'MATCHED',
  PENDING = 'PENDING'
}

export type PartnerMatchesResponse = {
  __typename?: 'PartnerMatchesResponse';
  matches: Array<PartnerMatch>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PartnerProfile = {
  __typename?: 'PartnerProfile';
  about?: Maybe<Scalars['String']['output']>;
  budgetMax?: Maybe<Scalars['Float']['output']>;
  budgetMin?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['String']['output'];
  genderPreference?: Maybe<GenderPreferenceEnum>;
  id: Scalars['ID']['output'];
  isLookingForPartner: Scalars['Boolean']['output'];
  lifestyle?: Maybe<Array<LifestyleEnum>>;
  moveInDate?: Maybe<Scalars['String']['output']>;
  preferredLocation?: Maybe<Scalars['String']['output']>;
  roommateCount?: Maybe<Scalars['Int']['output']>;
  stayDurationMonths?: Maybe<Scalars['Int']['output']>;
  targetPropertyId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export type PartnerProfileResponse = {
  __typename?: 'PartnerProfileResponse';
  message: Scalars['String']['output'];
  profile?: Maybe<PartnerProfile>;
  success: Scalars['Boolean']['output'];
};

export type PartnerProfilesResponse = {
  __typename?: 'PartnerProfilesResponse';
  message: Scalars['String']['output'];
  profiles: Array<PartnerProfile>;
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
};

export enum PrivacyType {
  ENTIRE_PLACE = 'entire_place',
  PRIVATE_ROOM = 'private_room',
  SHARED_ROOM = 'shared_room'
}

export type PropertiesResponse = {
  __typename?: 'PropertiesResponse';
  message: Scalars['String']['output'];
  properties: Array<Property>;
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Property = {
  __typename?: 'Property';
  amenities?: Maybe<Array<Scalars['String']['output']>>;
  availableFrom: Scalars['String']['output'];
  availableTo: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  host: Host;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  isActive: Scalars['Boolean']['output'];
  location: Location;
  maxRoommates?: Maybe<Scalars['Int']['output']>;
  pricePerMonth: Scalars['Float']['output'];
  privacyType?: Maybe<PrivacyType>;
  propertyType?: Maybe<PropertyType>;
  roomCount: Scalars['Int']['output'];
  shared: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PropertyResponse = {
  __typename?: 'PropertyResponse';
  message: Scalars['String']['output'];
  property?: Maybe<Property>;
  success: Scalars['Boolean']['output'];
};

export type PropertySearchInput = {
  amenities?: InputMaybe<Array<Scalars['String']['input']>>;
  availableFrom?: InputMaybe<Scalars['String']['input']>;
  availableTo?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  privacyType?: InputMaybe<PrivacyType>;
  propertyType?: InputMaybe<PropertyType>;
  roomCount?: InputMaybe<Scalars['Int']['input']>;
  shared?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  OTHER = 'other',
  STUDIO = 'studio'
}

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  checkMutualInterest?: Maybe<PartnerInterestResponse>;
  getPartnerInterest?: Maybe<PartnerInterestResponse>;
  getPartnerInterestsByTarget?: Maybe<PartnerInterestsResponse>;
  getPartnerInterestsByUser?: Maybe<PartnerInterestsResponse>;
  getPartnerMatch?: Maybe<PartnerMatchResponse>;
  getPartnerMatchesByProperty?: Maybe<PartnerMatchesResponse>;
  getPartnerMatchesByUser?: Maybe<PartnerMatchesResponse>;
  getPartnerProfile?: Maybe<PartnerProfileResponse>;
  getPartnerProfiles?: Maybe<PartnerProfilesResponse>;
  getPartnerProfilesByUser?: Maybe<PartnerProfilesResponse>;
  getProperties?: Maybe<PropertiesResponse>;
  getPropertiesByHost?: Maybe<PropertiesResponse>;
  getProperty?: Maybe<PropertyResponse>;
  getUser?: Maybe<UserResponse>;
  getUserProfile?: Maybe<UserResponse>;
  getUsers?: Maybe<UsersResponse>;
  searchProperties?: Maybe<PropertiesResponse>;
};


export type QueryCheckMutualInterestArgs = {
  userAId: Scalars['ID']['input'];
  userBId: Scalars['ID']['input'];
};


export type QueryGetPartnerInterestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPartnerInterestsByTargetArgs = {
  targetUserId: Scalars['ID']['input'];
};


export type QueryGetPartnerInterestsByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetPartnerMatchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPartnerMatchesByPropertyArgs = {
  propertyId: Scalars['ID']['input'];
};


export type QueryGetPartnerMatchesByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetPartnerProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPartnerProfilesByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetPropertiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPropertiesByHostArgs = {
  hostId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPropertyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<UserRole>;
};


export type QuerySearchPropertiesArgs = {
  input: PropertySearchInput;
};

export type UpdatePartnerInterestInput = {
  id: Scalars['ID']['input'];
  status: InterestStatusEnum;
};

export type UpdatePartnerMatchInput = {
  id: Scalars['ID']['input'];
  status: PartnerMatchStatusEnum;
};

export type UpdatePartnerProfileInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  budgetMax?: InputMaybe<Scalars['Float']['input']>;
  budgetMin?: InputMaybe<Scalars['Float']['input']>;
  genderPreference?: InputMaybe<GenderPreferenceEnum>;
  id: Scalars['ID']['input'];
  isLookingForPartner?: InputMaybe<Scalars['Boolean']['input']>;
  lifestyle?: InputMaybe<Array<LifestyleEnum>>;
  moveInDate?: InputMaybe<Scalars['String']['input']>;
  preferredLocation?: InputMaybe<Scalars['String']['input']>;
  roommateCount?: InputMaybe<Scalars['Int']['input']>;
  stayDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  targetPropertyId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdatePropertyInput = {
  amenities?: InputMaybe<Array<Scalars['String']['input']>>;
  availableFrom?: InputMaybe<Scalars['String']['input']>;
  availableTo?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<LocationInput>;
  maxRoommates?: InputMaybe<Scalars['Int']['input']>;
  pricePerMonth?: InputMaybe<Scalars['Float']['input']>;
  privacyType?: InputMaybe<PrivacyType>;
  propertyType?: InputMaybe<PropertyType>;
  roomCount?: InputMaybe<Scalars['Int']['input']>;
  shared?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  bio?: InputMaybe<Array<Scalars['String']['input']>>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type User = {
  __typename?: 'User';
  age?: Maybe<Scalars['Int']['output']>;
  bio?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updatedAt: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export enum UserRole {
  LANDLORD = 'landlord',
  RENTER = 'renter'
}

export type UsersResponse = {
  __typename?: 'UsersResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
  users: Array<User>;
};

export type GetPartnerInterestQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPartnerInterestQuery = { __typename?: 'Query', getPartnerInterest?: { __typename?: 'PartnerInterestResponse', success: boolean, message: string, interest?: { __typename?: 'PartnerInterest', id: string, userId: string, targetUserId: string, propertyId?: string | null, status: InterestStatusEnum, createdAt: string, updatedAt: string } | null } | null };

export type GetPartnerInterestsByUserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetPartnerInterestsByUserQuery = { __typename?: 'Query', getPartnerInterestsByUser?: { __typename?: 'PartnerInterestsResponse', success: boolean, message: string, totalCount: number, interests: Array<{ __typename?: 'PartnerInterest', id: string, userId: string, targetUserId: string, propertyId?: string | null, status: InterestStatusEnum, createdAt: string, updatedAt: string }> } | null };

export type GetPartnerInterestsByTargetQueryVariables = Exact<{
  targetUserId: Scalars['ID']['input'];
}>;


export type GetPartnerInterestsByTargetQuery = { __typename?: 'Query', getPartnerInterestsByTarget?: { __typename?: 'PartnerInterestsResponse', success: boolean, message: string, totalCount: number, interests: Array<{ __typename?: 'PartnerInterest', id: string, userId: string, targetUserId: string, propertyId?: string | null, status: InterestStatusEnum, createdAt: string, updatedAt: string }> } | null };

export type CheckMutualInterestQueryVariables = Exact<{
  userAId: Scalars['ID']['input'];
  userBId: Scalars['ID']['input'];
}>;


export type CheckMutualInterestQuery = { __typename?: 'Query', checkMutualInterest?: { __typename?: 'PartnerInterestResponse', success: boolean, message: string, matchCreated?: boolean | null, interest?: { __typename?: 'PartnerInterest', id: string, userId: string, targetUserId: string, propertyId?: string | null, status: InterestStatusEnum, createdAt: string, updatedAt: string } | null } | null };

export type CreatePartnerInterestMutationVariables = Exact<{
  input: CreatePartnerInterestInput;
}>;


export type CreatePartnerInterestMutation = { __typename?: 'Mutation', createPartnerInterest?: { __typename?: 'PartnerInterestResponse', success: boolean, message: string, matchCreated?: boolean | null, interest?: { __typename?: 'PartnerInterest', id: string, userId: string, targetUserId: string, propertyId?: string | null, status: InterestStatusEnum, createdAt: string, updatedAt: string } | null, match?: { __typename?: 'PartnerMatch', id: string, userAId: string, userBId: string, propertyId?: string | null, status: PartnerMatchStatusEnum, createdAt: string, updatedAt: string } | null } | null };

export type UpdatePartnerInterestMutationVariables = Exact<{
  input: UpdatePartnerInterestInput;
}>;


export type UpdatePartnerInterestMutation = { __typename?: 'Mutation', updatePartnerInterest?: { __typename?: 'PartnerInterestResponse', success: boolean, message: string, interest?: { __typename?: 'PartnerInterest', id: string, userId: string, targetUserId: string, propertyId?: string | null, status: InterestStatusEnum, createdAt: string, updatedAt: string } | null } | null };

export type DeletePartnerInterestMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePartnerInterestMutation = { __typename?: 'Mutation', deletePartnerInterest?: { __typename?: 'PartnerInterestResponse', success: boolean, message: string, interest?: { __typename?: 'PartnerInterest', id: string, userId: string, targetUserId: string, propertyId?: string | null, status: InterestStatusEnum, createdAt: string, updatedAt: string } | null } | null };

export type GetPartnerMatchQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPartnerMatchQuery = { __typename?: 'Query', getPartnerMatch?: { __typename?: 'PartnerMatchResponse', success: boolean, message: string, match?: { __typename?: 'PartnerMatch', id: string, userAId: string, userBId: string, propertyId?: string | null, status: PartnerMatchStatusEnum, createdAt: string, updatedAt: string } | null } | null };

export type GetPartnerMatchesByUserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetPartnerMatchesByUserQuery = { __typename?: 'Query', getPartnerMatchesByUser?: { __typename?: 'PartnerMatchesResponse', success: boolean, message: string, totalCount: number, matches: Array<{ __typename?: 'PartnerMatch', id: string, userAId: string, userBId: string, propertyId?: string | null, status: PartnerMatchStatusEnum, createdAt: string, updatedAt: string }> } | null };

export type GetPartnerMatchesByPropertyQueryVariables = Exact<{
  propertyId: Scalars['ID']['input'];
}>;


export type GetPartnerMatchesByPropertyQuery = { __typename?: 'Query', getPartnerMatchesByProperty?: { __typename?: 'PartnerMatchesResponse', success: boolean, message: string, totalCount: number, matches: Array<{ __typename?: 'PartnerMatch', id: string, userAId: string, userBId: string, propertyId?: string | null, status: PartnerMatchStatusEnum, createdAt: string, updatedAt: string }> } | null };

export type CreatePartnerMatchMutationVariables = Exact<{
  input: CreatePartnerMatchInput;
}>;


export type CreatePartnerMatchMutation = { __typename?: 'Mutation', createPartnerMatch?: { __typename?: 'PartnerMatchResponse', success: boolean, message: string, match?: { __typename?: 'PartnerMatch', id: string, userAId: string, userBId: string, propertyId?: string | null, status: PartnerMatchStatusEnum, createdAt: string, updatedAt: string } | null } | null };

export type UpdatePartnerMatchMutationVariables = Exact<{
  input: UpdatePartnerMatchInput;
}>;


export type UpdatePartnerMatchMutation = { __typename?: 'Mutation', updatePartnerMatch?: { __typename?: 'PartnerMatchResponse', success: boolean, message: string, match?: { __typename?: 'PartnerMatch', id: string, userAId: string, userBId: string, propertyId?: string | null, status: PartnerMatchStatusEnum, createdAt: string, updatedAt: string } | null } | null };

export type DeletePartnerMatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePartnerMatchMutation = { __typename?: 'Mutation', deletePartnerMatch?: { __typename?: 'PartnerMatchResponse', success: boolean, message: string, match?: { __typename?: 'PartnerMatch', id: string, userAId: string, userBId: string, propertyId?: string | null, status: PartnerMatchStatusEnum, createdAt: string, updatedAt: string } | null } | null };

export type GetPartnerProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPartnerProfilesQuery = { __typename?: 'Query', getPartnerProfiles?: { __typename?: 'PartnerProfilesResponse', success: boolean, message: string, totalCount: number, profiles: Array<{ __typename?: 'PartnerProfile', id: string, userId: string, targetPropertyId?: string | null, preferredLocation?: string | null, budgetMin?: number | null, budgetMax?: number | null, moveInDate?: string | null, stayDurationMonths?: number | null, roommateCount?: number | null, genderPreference?: GenderPreferenceEnum | null, lifestyle?: Array<LifestyleEnum> | null, about?: string | null, isLookingForPartner: boolean, createdAt: string, updatedAt: string, user?: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null, image?: string | null, bio?: Array<string> | null, age?: number | null, gender?: Gender | null, role: UserRole, createdAt: string, updatedAt: string } | null }> } | null };

export type GetPartnerProfilesByUserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetPartnerProfilesByUserQuery = { __typename?: 'Query', getPartnerProfilesByUser?: { __typename?: 'PartnerProfilesResponse', success: boolean, message: string, totalCount: number, profiles: Array<{ __typename?: 'PartnerProfile', id: string, userId: string, targetPropertyId?: string | null, preferredLocation?: string | null, budgetMin?: number | null, budgetMax?: number | null, moveInDate?: string | null, stayDurationMonths?: number | null, roommateCount?: number | null, genderPreference?: GenderPreferenceEnum | null, lifestyle?: Array<LifestyleEnum> | null, about?: string | null, isLookingForPartner: boolean, createdAt: string, updatedAt: string, user?: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null, image?: string | null, bio?: Array<string> | null, age?: number | null, gender?: Gender | null, role: UserRole, createdAt: string, updatedAt: string } | null }> } | null };

export type GetPartnerProfileQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPartnerProfileQuery = { __typename?: 'Query', getPartnerProfile?: { __typename?: 'PartnerProfileResponse', success: boolean, message: string, profile?: { __typename?: 'PartnerProfile', id: string, userId: string, targetPropertyId?: string | null, preferredLocation?: string | null, budgetMin?: number | null, budgetMax?: number | null, moveInDate?: string | null, stayDurationMonths?: number | null, roommateCount?: number | null, genderPreference?: GenderPreferenceEnum | null, lifestyle?: Array<LifestyleEnum> | null, about?: string | null, isLookingForPartner: boolean, createdAt: string, updatedAt: string, user?: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null, image?: string | null, bio?: Array<string> | null, age?: number | null, gender?: Gender | null, role: UserRole, createdAt: string, updatedAt: string } | null } | null } | null };

export type CreatePartnerProfileMutationVariables = Exact<{
  input: CreatePartnerProfileInput;
}>;


export type CreatePartnerProfileMutation = { __typename?: 'Mutation', createPartnerProfile?: { __typename?: 'PartnerProfileResponse', success: boolean, message: string, profile?: { __typename?: 'PartnerProfile', id: string, userId: string, targetPropertyId?: string | null, preferredLocation?: string | null, budgetMin?: number | null, budgetMax?: number | null, moveInDate?: string | null, stayDurationMonths?: number | null, roommateCount?: number | null, genderPreference?: GenderPreferenceEnum | null, lifestyle?: Array<LifestyleEnum> | null, about?: string | null, isLookingForPartner: boolean, createdAt: string, updatedAt: string } | null } | null };

export type CreatePropertyMutationVariables = Exact<{
  input: CreatePropertyInput;
}>;


export type CreatePropertyMutation = { __typename?: 'Mutation', createProperty?: { __typename?: 'PropertyResponse', success: boolean, message: string, property?: { __typename?: 'Property', id: string, title: string, description?: string | null, pricePerMonth: number, roomCount: number, shared: boolean, maxRoommates?: number | null, images?: Array<string> | null, amenities?: Array<string> | null, propertyType?: PropertyType | null, availableFrom: string, availableTo: string, isActive: boolean, createdAt: string, updatedAt: string, host: { __typename?: 'Host', id: string }, location: { __typename?: 'Location', city: string, district: string, address?: string | null, lat?: number | null, lng?: number | null } } | null } | null };

export type GetPropertyQueryVariables = Exact<{
  getPropertyId: Scalars['ID']['input'];
}>;


export type GetPropertyQuery = { __typename?: 'Query', getProperty?: { __typename?: 'PropertyResponse', success: boolean, message: string, property?: { __typename?: 'Property', id: string, title: string, description?: string | null, pricePerMonth: number, roomCount: number, shared: boolean, maxRoommates?: number | null, images?: Array<string> | null, amenities?: Array<string> | null, propertyType?: PropertyType | null, availableFrom: string, availableTo: string, isActive: boolean, createdAt: string, updatedAt: string, host: { __typename?: 'Host', name: string, image?: string | null }, location: { __typename?: 'Location', city: string, district: string, address?: string | null, lat?: number | null, lng?: number | null } } | null } | null };

export type SearchPropertiesQueryVariables = Exact<{
  input: PropertySearchInput;
}>;


export type SearchPropertiesQuery = { __typename?: 'Query', searchProperties?: { __typename?: 'PropertiesResponse', success: boolean, message: string, totalCount: number, properties: Array<{ __typename?: 'Property', id: string, title: string, description?: string | null, pricePerMonth: number, roomCount: number, shared: boolean, maxRoommates?: number | null, images?: Array<string> | null, amenities?: Array<string> | null, propertyType?: PropertyType | null, availableFrom: string, availableTo: string, isActive: boolean, createdAt: string, updatedAt: string, host: { __typename?: 'Host', name: string, image?: string | null }, location: { __typename?: 'Location', city: string, district: string, address?: string | null, lat?: number | null, lng?: number | null } }> } | null };

export type GetPropertiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPropertiesQuery = { __typename?: 'Query', getProperties?: { __typename?: 'PropertiesResponse', success: boolean, message: string, totalCount: number, properties: Array<{ __typename?: 'Property', id: string, title: string, description?: string | null, pricePerMonth: number, roomCount: number, shared: boolean, maxRoommates?: number | null, images?: Array<string> | null, amenities?: Array<string> | null, propertyType?: PropertyType | null, availableFrom: string, availableTo: string, isActive: boolean, createdAt: string, updatedAt: string, host: { __typename?: 'Host', name: string, image?: string | null }, location: { __typename?: 'Location', city: string, district: string, address?: string | null, lat?: number | null, lng?: number | null } }> } | null };

export type GetPropertiesByHostQueryVariables = Exact<{
  hostId: Scalars['ID']['input'];
}>;


export type GetPropertiesByHostQuery = { __typename?: 'Query', getPropertiesByHost?: { __typename?: 'PropertiesResponse', success: boolean, message: string, totalCount: number, properties: Array<{ __typename?: 'Property', id: string, title: string, description?: string | null, pricePerMonth: number, roomCount: number, shared: boolean, maxRoommates?: number | null, images?: Array<string> | null, amenities?: Array<string> | null, propertyType?: PropertyType | null, availableFrom: string, availableTo: string, isActive: boolean, createdAt: string, updatedAt: string, host: { __typename?: 'Host', name: string, image?: string | null }, location: { __typename?: 'Location', city: string, district: string, address?: string | null, lat?: number | null, lng?: number | null } }> } | null };

export type UpdatePropertyMutationVariables = Exact<{
  input: UpdatePropertyInput;
}>;


export type UpdatePropertyMutation = { __typename?: 'Mutation', updateProperty?: { __typename?: 'PropertyResponse', success: boolean, message: string, property?: { __typename?: 'Property', id: string, title: string, description?: string | null, pricePerMonth: number, roomCount: number, shared: boolean, maxRoommates?: number | null, images?: Array<string> | null, amenities?: Array<string> | null, propertyType?: PropertyType | null, availableFrom: string, availableTo: string, isActive: boolean, createdAt: string, updatedAt: string, host: { __typename?: 'Host', id: string }, location: { __typename?: 'Location', city: string, district: string, address?: string | null, lat?: number | null, lng?: number | null } } | null } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'UserResponse', success: boolean, message: string, token?: string | null, user?: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null, image?: string | null, bio?: Array<string> | null, age?: number | null, gender?: Gender | null, role: UserRole, createdAt: string, updatedAt: string } | null } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserResponse', success: boolean, message: string, token?: string | null, user?: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null, image?: string | null, bio?: Array<string> | null, age?: number | null, gender?: Gender | null, role: UserRole, createdAt: string, updatedAt: string } | null } | null };

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'UserResponse', success: boolean, message: string, token?: string | null, user?: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null, image?: string | null, bio?: Array<string> | null, age?: number | null, gender?: Gender | null, role: UserRole, createdAt: string, updatedAt: string } | null } | null };


export const GetPartnerInterestDocument = gql`
    query GetPartnerInterest($id: ID!) {
  getPartnerInterest(id: $id) {
    success
    message
    interest {
      id
      userId
      targetUserId
      propertyId
      status
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetPartnerInterestQuery__
 *
 * To run a query within a React component, call `useGetPartnerInterestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerInterestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerInterestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPartnerInterestQuery(baseOptions: Apollo.QueryHookOptions<GetPartnerInterestQuery, GetPartnerInterestQueryVariables> & ({ variables: GetPartnerInterestQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnerInterestQuery, GetPartnerInterestQueryVariables>(GetPartnerInterestDocument, options);
      }
export function useGetPartnerInterestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerInterestQuery, GetPartnerInterestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnerInterestQuery, GetPartnerInterestQueryVariables>(GetPartnerInterestDocument, options);
        }
export function useGetPartnerInterestSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPartnerInterestQuery, GetPartnerInterestQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPartnerInterestQuery, GetPartnerInterestQueryVariables>(GetPartnerInterestDocument, options);
        }
export type GetPartnerInterestQueryHookResult = ReturnType<typeof useGetPartnerInterestQuery>;
export type GetPartnerInterestLazyQueryHookResult = ReturnType<typeof useGetPartnerInterestLazyQuery>;
export type GetPartnerInterestSuspenseQueryHookResult = ReturnType<typeof useGetPartnerInterestSuspenseQuery>;
export type GetPartnerInterestQueryResult = Apollo.QueryResult<GetPartnerInterestQuery, GetPartnerInterestQueryVariables>;
export const GetPartnerInterestsByUserDocument = gql`
    query GetPartnerInterestsByUser($userId: ID!) {
  getPartnerInterestsByUser(userId: $userId) {
    success
    message
    interests {
      id
      userId
      targetUserId
      propertyId
      status
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

/**
 * __useGetPartnerInterestsByUserQuery__
 *
 * To run a query within a React component, call `useGetPartnerInterestsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerInterestsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerInterestsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPartnerInterestsByUserQuery(baseOptions: Apollo.QueryHookOptions<GetPartnerInterestsByUserQuery, GetPartnerInterestsByUserQueryVariables> & ({ variables: GetPartnerInterestsByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnerInterestsByUserQuery, GetPartnerInterestsByUserQueryVariables>(GetPartnerInterestsByUserDocument, options);
      }
export function useGetPartnerInterestsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerInterestsByUserQuery, GetPartnerInterestsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnerInterestsByUserQuery, GetPartnerInterestsByUserQueryVariables>(GetPartnerInterestsByUserDocument, options);
        }
export function useGetPartnerInterestsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPartnerInterestsByUserQuery, GetPartnerInterestsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPartnerInterestsByUserQuery, GetPartnerInterestsByUserQueryVariables>(GetPartnerInterestsByUserDocument, options);
        }
export type GetPartnerInterestsByUserQueryHookResult = ReturnType<typeof useGetPartnerInterestsByUserQuery>;
export type GetPartnerInterestsByUserLazyQueryHookResult = ReturnType<typeof useGetPartnerInterestsByUserLazyQuery>;
export type GetPartnerInterestsByUserSuspenseQueryHookResult = ReturnType<typeof useGetPartnerInterestsByUserSuspenseQuery>;
export type GetPartnerInterestsByUserQueryResult = Apollo.QueryResult<GetPartnerInterestsByUserQuery, GetPartnerInterestsByUserQueryVariables>;
export const GetPartnerInterestsByTargetDocument = gql`
    query GetPartnerInterestsByTarget($targetUserId: ID!) {
  getPartnerInterestsByTarget(targetUserId: $targetUserId) {
    success
    message
    interests {
      id
      userId
      targetUserId
      propertyId
      status
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

/**
 * __useGetPartnerInterestsByTargetQuery__
 *
 * To run a query within a React component, call `useGetPartnerInterestsByTargetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerInterestsByTargetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerInterestsByTargetQuery({
 *   variables: {
 *      targetUserId: // value for 'targetUserId'
 *   },
 * });
 */
export function useGetPartnerInterestsByTargetQuery(baseOptions: Apollo.QueryHookOptions<GetPartnerInterestsByTargetQuery, GetPartnerInterestsByTargetQueryVariables> & ({ variables: GetPartnerInterestsByTargetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnerInterestsByTargetQuery, GetPartnerInterestsByTargetQueryVariables>(GetPartnerInterestsByTargetDocument, options);
      }
export function useGetPartnerInterestsByTargetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerInterestsByTargetQuery, GetPartnerInterestsByTargetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnerInterestsByTargetQuery, GetPartnerInterestsByTargetQueryVariables>(GetPartnerInterestsByTargetDocument, options);
        }
export function useGetPartnerInterestsByTargetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPartnerInterestsByTargetQuery, GetPartnerInterestsByTargetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPartnerInterestsByTargetQuery, GetPartnerInterestsByTargetQueryVariables>(GetPartnerInterestsByTargetDocument, options);
        }
export type GetPartnerInterestsByTargetQueryHookResult = ReturnType<typeof useGetPartnerInterestsByTargetQuery>;
export type GetPartnerInterestsByTargetLazyQueryHookResult = ReturnType<typeof useGetPartnerInterestsByTargetLazyQuery>;
export type GetPartnerInterestsByTargetSuspenseQueryHookResult = ReturnType<typeof useGetPartnerInterestsByTargetSuspenseQuery>;
export type GetPartnerInterestsByTargetQueryResult = Apollo.QueryResult<GetPartnerInterestsByTargetQuery, GetPartnerInterestsByTargetQueryVariables>;
export const CheckMutualInterestDocument = gql`
    query CheckMutualInterest($userAId: ID!, $userBId: ID!) {
  checkMutualInterest(userAId: $userAId, userBId: $userBId) {
    success
    message
    interest {
      id
      userId
      targetUserId
      propertyId
      status
      createdAt
      updatedAt
    }
    matchCreated
  }
}
    `;

/**
 * __useCheckMutualInterestQuery__
 *
 * To run a query within a React component, call `useCheckMutualInterestQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckMutualInterestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckMutualInterestQuery({
 *   variables: {
 *      userAId: // value for 'userAId'
 *      userBId: // value for 'userBId'
 *   },
 * });
 */
export function useCheckMutualInterestQuery(baseOptions: Apollo.QueryHookOptions<CheckMutualInterestQuery, CheckMutualInterestQueryVariables> & ({ variables: CheckMutualInterestQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckMutualInterestQuery, CheckMutualInterestQueryVariables>(CheckMutualInterestDocument, options);
      }
export function useCheckMutualInterestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckMutualInterestQuery, CheckMutualInterestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckMutualInterestQuery, CheckMutualInterestQueryVariables>(CheckMutualInterestDocument, options);
        }
export function useCheckMutualInterestSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckMutualInterestQuery, CheckMutualInterestQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckMutualInterestQuery, CheckMutualInterestQueryVariables>(CheckMutualInterestDocument, options);
        }
export type CheckMutualInterestQueryHookResult = ReturnType<typeof useCheckMutualInterestQuery>;
export type CheckMutualInterestLazyQueryHookResult = ReturnType<typeof useCheckMutualInterestLazyQuery>;
export type CheckMutualInterestSuspenseQueryHookResult = ReturnType<typeof useCheckMutualInterestSuspenseQuery>;
export type CheckMutualInterestQueryResult = Apollo.QueryResult<CheckMutualInterestQuery, CheckMutualInterestQueryVariables>;
export const CreatePartnerInterestDocument = gql`
    mutation CreatePartnerInterest($input: CreatePartnerInterestInput!) {
  createPartnerInterest(input: $input) {
    success
    message
    interest {
      id
      userId
      targetUserId
      propertyId
      status
      createdAt
      updatedAt
    }
    matchCreated
    match {
      id
      userAId
      userBId
      propertyId
      status
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreatePartnerInterestMutationFn = Apollo.MutationFunction<CreatePartnerInterestMutation, CreatePartnerInterestMutationVariables>;

/**
 * __useCreatePartnerInterestMutation__
 *
 * To run a mutation, you first call `useCreatePartnerInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartnerInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartnerInterestMutation, { data, loading, error }] = useCreatePartnerInterestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePartnerInterestMutation(baseOptions?: Apollo.MutationHookOptions<CreatePartnerInterestMutation, CreatePartnerInterestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePartnerInterestMutation, CreatePartnerInterestMutationVariables>(CreatePartnerInterestDocument, options);
      }
export type CreatePartnerInterestMutationHookResult = ReturnType<typeof useCreatePartnerInterestMutation>;
export type CreatePartnerInterestMutationResult = Apollo.MutationResult<CreatePartnerInterestMutation>;
export type CreatePartnerInterestMutationOptions = Apollo.BaseMutationOptions<CreatePartnerInterestMutation, CreatePartnerInterestMutationVariables>;
export const UpdatePartnerInterestDocument = gql`
    mutation UpdatePartnerInterest($input: UpdatePartnerInterestInput!) {
  updatePartnerInterest(input: $input) {
    success
    message
    interest {
      id
      userId
      targetUserId
      propertyId
      status
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdatePartnerInterestMutationFn = Apollo.MutationFunction<UpdatePartnerInterestMutation, UpdatePartnerInterestMutationVariables>;

/**
 * __useUpdatePartnerInterestMutation__
 *
 * To run a mutation, you first call `useUpdatePartnerInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePartnerInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePartnerInterestMutation, { data, loading, error }] = useUpdatePartnerInterestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePartnerInterestMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePartnerInterestMutation, UpdatePartnerInterestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePartnerInterestMutation, UpdatePartnerInterestMutationVariables>(UpdatePartnerInterestDocument, options);
      }
export type UpdatePartnerInterestMutationHookResult = ReturnType<typeof useUpdatePartnerInterestMutation>;
export type UpdatePartnerInterestMutationResult = Apollo.MutationResult<UpdatePartnerInterestMutation>;
export type UpdatePartnerInterestMutationOptions = Apollo.BaseMutationOptions<UpdatePartnerInterestMutation, UpdatePartnerInterestMutationVariables>;
export const DeletePartnerInterestDocument = gql`
    mutation DeletePartnerInterest($id: ID!) {
  deletePartnerInterest(id: $id) {
    success
    message
    interest {
      id
      userId
      targetUserId
      propertyId
      status
      createdAt
      updatedAt
    }
  }
}
    `;
export type DeletePartnerInterestMutationFn = Apollo.MutationFunction<DeletePartnerInterestMutation, DeletePartnerInterestMutationVariables>;

/**
 * __useDeletePartnerInterestMutation__
 *
 * To run a mutation, you first call `useDeletePartnerInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePartnerInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePartnerInterestMutation, { data, loading, error }] = useDeletePartnerInterestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePartnerInterestMutation(baseOptions?: Apollo.MutationHookOptions<DeletePartnerInterestMutation, DeletePartnerInterestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePartnerInterestMutation, DeletePartnerInterestMutationVariables>(DeletePartnerInterestDocument, options);
      }
export type DeletePartnerInterestMutationHookResult = ReturnType<typeof useDeletePartnerInterestMutation>;
export type DeletePartnerInterestMutationResult = Apollo.MutationResult<DeletePartnerInterestMutation>;
export type DeletePartnerInterestMutationOptions = Apollo.BaseMutationOptions<DeletePartnerInterestMutation, DeletePartnerInterestMutationVariables>;
export const GetPartnerMatchDocument = gql`
    query GetPartnerMatch($id: ID!) {
  getPartnerMatch(id: $id) {
    success
    message
    match {
      id
      userAId
      userBId
      propertyId
      status
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetPartnerMatchQuery__
 *
 * To run a query within a React component, call `useGetPartnerMatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerMatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerMatchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPartnerMatchQuery(baseOptions: Apollo.QueryHookOptions<GetPartnerMatchQuery, GetPartnerMatchQueryVariables> & ({ variables: GetPartnerMatchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnerMatchQuery, GetPartnerMatchQueryVariables>(GetPartnerMatchDocument, options);
      }
export function useGetPartnerMatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerMatchQuery, GetPartnerMatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnerMatchQuery, GetPartnerMatchQueryVariables>(GetPartnerMatchDocument, options);
        }
export function useGetPartnerMatchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPartnerMatchQuery, GetPartnerMatchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPartnerMatchQuery, GetPartnerMatchQueryVariables>(GetPartnerMatchDocument, options);
        }
export type GetPartnerMatchQueryHookResult = ReturnType<typeof useGetPartnerMatchQuery>;
export type GetPartnerMatchLazyQueryHookResult = ReturnType<typeof useGetPartnerMatchLazyQuery>;
export type GetPartnerMatchSuspenseQueryHookResult = ReturnType<typeof useGetPartnerMatchSuspenseQuery>;
export type GetPartnerMatchQueryResult = Apollo.QueryResult<GetPartnerMatchQuery, GetPartnerMatchQueryVariables>;
export const GetPartnerMatchesByUserDocument = gql`
    query GetPartnerMatchesByUser($userId: ID!) {
  getPartnerMatchesByUser(userId: $userId) {
    success
    message
    matches {
      id
      userAId
      userBId
      propertyId
      status
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

/**
 * __useGetPartnerMatchesByUserQuery__
 *
 * To run a query within a React component, call `useGetPartnerMatchesByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerMatchesByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerMatchesByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPartnerMatchesByUserQuery(baseOptions: Apollo.QueryHookOptions<GetPartnerMatchesByUserQuery, GetPartnerMatchesByUserQueryVariables> & ({ variables: GetPartnerMatchesByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnerMatchesByUserQuery, GetPartnerMatchesByUserQueryVariables>(GetPartnerMatchesByUserDocument, options);
      }
export function useGetPartnerMatchesByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerMatchesByUserQuery, GetPartnerMatchesByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnerMatchesByUserQuery, GetPartnerMatchesByUserQueryVariables>(GetPartnerMatchesByUserDocument, options);
        }
export function useGetPartnerMatchesByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPartnerMatchesByUserQuery, GetPartnerMatchesByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPartnerMatchesByUserQuery, GetPartnerMatchesByUserQueryVariables>(GetPartnerMatchesByUserDocument, options);
        }
export type GetPartnerMatchesByUserQueryHookResult = ReturnType<typeof useGetPartnerMatchesByUserQuery>;
export type GetPartnerMatchesByUserLazyQueryHookResult = ReturnType<typeof useGetPartnerMatchesByUserLazyQuery>;
export type GetPartnerMatchesByUserSuspenseQueryHookResult = ReturnType<typeof useGetPartnerMatchesByUserSuspenseQuery>;
export type GetPartnerMatchesByUserQueryResult = Apollo.QueryResult<GetPartnerMatchesByUserQuery, GetPartnerMatchesByUserQueryVariables>;
export const GetPartnerMatchesByPropertyDocument = gql`
    query GetPartnerMatchesByProperty($propertyId: ID!) {
  getPartnerMatchesByProperty(propertyId: $propertyId) {
    success
    message
    matches {
      id
      userAId
      userBId
      propertyId
      status
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

/**
 * __useGetPartnerMatchesByPropertyQuery__
 *
 * To run a query within a React component, call `useGetPartnerMatchesByPropertyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerMatchesByPropertyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerMatchesByPropertyQuery({
 *   variables: {
 *      propertyId: // value for 'propertyId'
 *   },
 * });
 */
export function useGetPartnerMatchesByPropertyQuery(baseOptions: Apollo.QueryHookOptions<GetPartnerMatchesByPropertyQuery, GetPartnerMatchesByPropertyQueryVariables> & ({ variables: GetPartnerMatchesByPropertyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnerMatchesByPropertyQuery, GetPartnerMatchesByPropertyQueryVariables>(GetPartnerMatchesByPropertyDocument, options);
      }
export function useGetPartnerMatchesByPropertyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerMatchesByPropertyQuery, GetPartnerMatchesByPropertyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnerMatchesByPropertyQuery, GetPartnerMatchesByPropertyQueryVariables>(GetPartnerMatchesByPropertyDocument, options);
        }
export function useGetPartnerMatchesByPropertySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPartnerMatchesByPropertyQuery, GetPartnerMatchesByPropertyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPartnerMatchesByPropertyQuery, GetPartnerMatchesByPropertyQueryVariables>(GetPartnerMatchesByPropertyDocument, options);
        }
export type GetPartnerMatchesByPropertyQueryHookResult = ReturnType<typeof useGetPartnerMatchesByPropertyQuery>;
export type GetPartnerMatchesByPropertyLazyQueryHookResult = ReturnType<typeof useGetPartnerMatchesByPropertyLazyQuery>;
export type GetPartnerMatchesByPropertySuspenseQueryHookResult = ReturnType<typeof useGetPartnerMatchesByPropertySuspenseQuery>;
export type GetPartnerMatchesByPropertyQueryResult = Apollo.QueryResult<GetPartnerMatchesByPropertyQuery, GetPartnerMatchesByPropertyQueryVariables>;
export const CreatePartnerMatchDocument = gql`
    mutation CreatePartnerMatch($input: CreatePartnerMatchInput!) {
  createPartnerMatch(input: $input) {
    success
    message
    match {
      id
      userAId
      userBId
      propertyId
      status
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreatePartnerMatchMutationFn = Apollo.MutationFunction<CreatePartnerMatchMutation, CreatePartnerMatchMutationVariables>;

/**
 * __useCreatePartnerMatchMutation__
 *
 * To run a mutation, you first call `useCreatePartnerMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartnerMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartnerMatchMutation, { data, loading, error }] = useCreatePartnerMatchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePartnerMatchMutation(baseOptions?: Apollo.MutationHookOptions<CreatePartnerMatchMutation, CreatePartnerMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePartnerMatchMutation, CreatePartnerMatchMutationVariables>(CreatePartnerMatchDocument, options);
      }
export type CreatePartnerMatchMutationHookResult = ReturnType<typeof useCreatePartnerMatchMutation>;
export type CreatePartnerMatchMutationResult = Apollo.MutationResult<CreatePartnerMatchMutation>;
export type CreatePartnerMatchMutationOptions = Apollo.BaseMutationOptions<CreatePartnerMatchMutation, CreatePartnerMatchMutationVariables>;
export const UpdatePartnerMatchDocument = gql`
    mutation UpdatePartnerMatch($input: UpdatePartnerMatchInput!) {
  updatePartnerMatch(input: $input) {
    success
    message
    match {
      id
      userAId
      userBId
      propertyId
      status
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdatePartnerMatchMutationFn = Apollo.MutationFunction<UpdatePartnerMatchMutation, UpdatePartnerMatchMutationVariables>;

/**
 * __useUpdatePartnerMatchMutation__
 *
 * To run a mutation, you first call `useUpdatePartnerMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePartnerMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePartnerMatchMutation, { data, loading, error }] = useUpdatePartnerMatchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePartnerMatchMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePartnerMatchMutation, UpdatePartnerMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePartnerMatchMutation, UpdatePartnerMatchMutationVariables>(UpdatePartnerMatchDocument, options);
      }
export type UpdatePartnerMatchMutationHookResult = ReturnType<typeof useUpdatePartnerMatchMutation>;
export type UpdatePartnerMatchMutationResult = Apollo.MutationResult<UpdatePartnerMatchMutation>;
export type UpdatePartnerMatchMutationOptions = Apollo.BaseMutationOptions<UpdatePartnerMatchMutation, UpdatePartnerMatchMutationVariables>;
export const DeletePartnerMatchDocument = gql`
    mutation DeletePartnerMatch($id: ID!) {
  deletePartnerMatch(id: $id) {
    success
    message
    match {
      id
      userAId
      userBId
      propertyId
      status
      createdAt
      updatedAt
    }
  }
}
    `;
export type DeletePartnerMatchMutationFn = Apollo.MutationFunction<DeletePartnerMatchMutation, DeletePartnerMatchMutationVariables>;

/**
 * __useDeletePartnerMatchMutation__
 *
 * To run a mutation, you first call `useDeletePartnerMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePartnerMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePartnerMatchMutation, { data, loading, error }] = useDeletePartnerMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePartnerMatchMutation(baseOptions?: Apollo.MutationHookOptions<DeletePartnerMatchMutation, DeletePartnerMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePartnerMatchMutation, DeletePartnerMatchMutationVariables>(DeletePartnerMatchDocument, options);
      }
export type DeletePartnerMatchMutationHookResult = ReturnType<typeof useDeletePartnerMatchMutation>;
export type DeletePartnerMatchMutationResult = Apollo.MutationResult<DeletePartnerMatchMutation>;
export type DeletePartnerMatchMutationOptions = Apollo.BaseMutationOptions<DeletePartnerMatchMutation, DeletePartnerMatchMutationVariables>;
export const GetPartnerProfilesDocument = gql`
    query GetPartnerProfiles {
  getPartnerProfiles {
    success
    message
    profiles {
      id
      userId
      user {
        id
        name
        email
        phone
        image
        bio
        age
        gender
        role
        createdAt
        updatedAt
      }
      targetPropertyId
      preferredLocation
      budgetMin
      budgetMax
      moveInDate
      stayDurationMonths
      roommateCount
      genderPreference
      lifestyle
      about
      isLookingForPartner
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

/**
 * __useGetPartnerProfilesQuery__
 *
 * To run a query within a React component, call `useGetPartnerProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerProfilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPartnerProfilesQuery(baseOptions?: Apollo.QueryHookOptions<GetPartnerProfilesQuery, GetPartnerProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnerProfilesQuery, GetPartnerProfilesQueryVariables>(GetPartnerProfilesDocument, options);
      }
export function useGetPartnerProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerProfilesQuery, GetPartnerProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnerProfilesQuery, GetPartnerProfilesQueryVariables>(GetPartnerProfilesDocument, options);
        }
export function useGetPartnerProfilesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPartnerProfilesQuery, GetPartnerProfilesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPartnerProfilesQuery, GetPartnerProfilesQueryVariables>(GetPartnerProfilesDocument, options);
        }
export type GetPartnerProfilesQueryHookResult = ReturnType<typeof useGetPartnerProfilesQuery>;
export type GetPartnerProfilesLazyQueryHookResult = ReturnType<typeof useGetPartnerProfilesLazyQuery>;
export type GetPartnerProfilesSuspenseQueryHookResult = ReturnType<typeof useGetPartnerProfilesSuspenseQuery>;
export type GetPartnerProfilesQueryResult = Apollo.QueryResult<GetPartnerProfilesQuery, GetPartnerProfilesQueryVariables>;
export const GetPartnerProfilesByUserDocument = gql`
    query GetPartnerProfilesByUser($userId: ID!) {
  getPartnerProfilesByUser(userId: $userId) {
    success
    message
    profiles {
      id
      userId
      user {
        id
        name
        email
        phone
        image
        bio
        age
        gender
        role
        createdAt
        updatedAt
      }
      targetPropertyId
      preferredLocation
      budgetMin
      budgetMax
      moveInDate
      stayDurationMonths
      roommateCount
      genderPreference
      lifestyle
      about
      isLookingForPartner
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

/**
 * __useGetPartnerProfilesByUserQuery__
 *
 * To run a query within a React component, call `useGetPartnerProfilesByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerProfilesByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerProfilesByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPartnerProfilesByUserQuery(baseOptions: Apollo.QueryHookOptions<GetPartnerProfilesByUserQuery, GetPartnerProfilesByUserQueryVariables> & ({ variables: GetPartnerProfilesByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnerProfilesByUserQuery, GetPartnerProfilesByUserQueryVariables>(GetPartnerProfilesByUserDocument, options);
      }
export function useGetPartnerProfilesByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerProfilesByUserQuery, GetPartnerProfilesByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnerProfilesByUserQuery, GetPartnerProfilesByUserQueryVariables>(GetPartnerProfilesByUserDocument, options);
        }
export function useGetPartnerProfilesByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPartnerProfilesByUserQuery, GetPartnerProfilesByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPartnerProfilesByUserQuery, GetPartnerProfilesByUserQueryVariables>(GetPartnerProfilesByUserDocument, options);
        }
export type GetPartnerProfilesByUserQueryHookResult = ReturnType<typeof useGetPartnerProfilesByUserQuery>;
export type GetPartnerProfilesByUserLazyQueryHookResult = ReturnType<typeof useGetPartnerProfilesByUserLazyQuery>;
export type GetPartnerProfilesByUserSuspenseQueryHookResult = ReturnType<typeof useGetPartnerProfilesByUserSuspenseQuery>;
export type GetPartnerProfilesByUserQueryResult = Apollo.QueryResult<GetPartnerProfilesByUserQuery, GetPartnerProfilesByUserQueryVariables>;
export const GetPartnerProfileDocument = gql`
    query GetPartnerProfile($id: ID!) {
  getPartnerProfile(id: $id) {
    success
    message
    profile {
      id
      userId
      user {
        id
        name
        email
        phone
        image
        bio
        age
        gender
        role
        createdAt
        updatedAt
      }
      targetPropertyId
      preferredLocation
      budgetMin
      budgetMax
      moveInDate
      stayDurationMonths
      roommateCount
      genderPreference
      lifestyle
      about
      isLookingForPartner
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetPartnerProfileQuery__
 *
 * To run a query within a React component, call `useGetPartnerProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPartnerProfileQuery(baseOptions: Apollo.QueryHookOptions<GetPartnerProfileQuery, GetPartnerProfileQueryVariables> & ({ variables: GetPartnerProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnerProfileQuery, GetPartnerProfileQueryVariables>(GetPartnerProfileDocument, options);
      }
export function useGetPartnerProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerProfileQuery, GetPartnerProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnerProfileQuery, GetPartnerProfileQueryVariables>(GetPartnerProfileDocument, options);
        }
export function useGetPartnerProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPartnerProfileQuery, GetPartnerProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPartnerProfileQuery, GetPartnerProfileQueryVariables>(GetPartnerProfileDocument, options);
        }
export type GetPartnerProfileQueryHookResult = ReturnType<typeof useGetPartnerProfileQuery>;
export type GetPartnerProfileLazyQueryHookResult = ReturnType<typeof useGetPartnerProfileLazyQuery>;
export type GetPartnerProfileSuspenseQueryHookResult = ReturnType<typeof useGetPartnerProfileSuspenseQuery>;
export type GetPartnerProfileQueryResult = Apollo.QueryResult<GetPartnerProfileQuery, GetPartnerProfileQueryVariables>;
export const CreatePartnerProfileDocument = gql`
    mutation createPartnerProfile($input: CreatePartnerProfileInput!) {
  createPartnerProfile(input: $input) {
    success
    message
    profile {
      id
      userId
      targetPropertyId
      preferredLocation
      budgetMin
      budgetMax
      moveInDate
      stayDurationMonths
      roommateCount
      genderPreference
      lifestyle
      about
      isLookingForPartner
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreatePartnerProfileMutationFn = Apollo.MutationFunction<CreatePartnerProfileMutation, CreatePartnerProfileMutationVariables>;

/**
 * __useCreatePartnerProfileMutation__
 *
 * To run a mutation, you first call `useCreatePartnerProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartnerProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartnerProfileMutation, { data, loading, error }] = useCreatePartnerProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePartnerProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreatePartnerProfileMutation, CreatePartnerProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePartnerProfileMutation, CreatePartnerProfileMutationVariables>(CreatePartnerProfileDocument, options);
      }
export type CreatePartnerProfileMutationHookResult = ReturnType<typeof useCreatePartnerProfileMutation>;
export type CreatePartnerProfileMutationResult = Apollo.MutationResult<CreatePartnerProfileMutation>;
export type CreatePartnerProfileMutationOptions = Apollo.BaseMutationOptions<CreatePartnerProfileMutation, CreatePartnerProfileMutationVariables>;
export const CreatePropertyDocument = gql`
    mutation CreateProperty($input: CreatePropertyInput!) {
  createProperty(input: $input) {
    success
    message
    property {
      id
      title
      description
      host {
        id
      }
      location {
        city
        district
        address
        lat
        lng
      }
      pricePerMonth
      roomCount
      shared
      maxRoommates
      images
      amenities
      propertyType
      availableFrom
      availableTo
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreatePropertyMutationFn = Apollo.MutationFunction<CreatePropertyMutation, CreatePropertyMutationVariables>;

/**
 * __useCreatePropertyMutation__
 *
 * To run a mutation, you first call `useCreatePropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPropertyMutation, { data, loading, error }] = useCreatePropertyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePropertyMutation(baseOptions?: Apollo.MutationHookOptions<CreatePropertyMutation, CreatePropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePropertyMutation, CreatePropertyMutationVariables>(CreatePropertyDocument, options);
      }
export type CreatePropertyMutationHookResult = ReturnType<typeof useCreatePropertyMutation>;
export type CreatePropertyMutationResult = Apollo.MutationResult<CreatePropertyMutation>;
export type CreatePropertyMutationOptions = Apollo.BaseMutationOptions<CreatePropertyMutation, CreatePropertyMutationVariables>;
export const GetPropertyDocument = gql`
    query GetProperty($getPropertyId: ID!) {
  getProperty(id: $getPropertyId) {
    success
    message
    property {
      id
      title
      description
      host {
        name
        image
      }
      location {
        city
        district
        address
        lat
        lng
      }
      pricePerMonth
      roomCount
      shared
      maxRoommates
      images
      amenities
      propertyType
      availableFrom
      availableTo
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetPropertyQuery__
 *
 * To run a query within a React component, call `useGetPropertyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertyQuery({
 *   variables: {
 *      getPropertyId: // value for 'getPropertyId'
 *   },
 * });
 */
export function useGetPropertyQuery(baseOptions: Apollo.QueryHookOptions<GetPropertyQuery, GetPropertyQueryVariables> & ({ variables: GetPropertyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertyQuery, GetPropertyQueryVariables>(GetPropertyDocument, options);
      }
export function useGetPropertyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertyQuery, GetPropertyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertyQuery, GetPropertyQueryVariables>(GetPropertyDocument, options);
        }
export function useGetPropertySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPropertyQuery, GetPropertyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertyQuery, GetPropertyQueryVariables>(GetPropertyDocument, options);
        }
export type GetPropertyQueryHookResult = ReturnType<typeof useGetPropertyQuery>;
export type GetPropertyLazyQueryHookResult = ReturnType<typeof useGetPropertyLazyQuery>;
export type GetPropertySuspenseQueryHookResult = ReturnType<typeof useGetPropertySuspenseQuery>;
export type GetPropertyQueryResult = Apollo.QueryResult<GetPropertyQuery, GetPropertyQueryVariables>;
export const SearchPropertiesDocument = gql`
    query SearchProperties($input: PropertySearchInput!) {
  searchProperties(input: $input) {
    success
    message
    properties {
      id
      title
      description
      host {
        name
        image
      }
      location {
        city
        district
        address
        lat
        lng
      }
      pricePerMonth
      roomCount
      shared
      maxRoommates
      images
      amenities
      propertyType
      availableFrom
      availableTo
      isActive
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

/**
 * __useSearchPropertiesQuery__
 *
 * To run a query within a React component, call `useSearchPropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPropertiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchPropertiesQuery(baseOptions: Apollo.QueryHookOptions<SearchPropertiesQuery, SearchPropertiesQueryVariables> & ({ variables: SearchPropertiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPropertiesQuery, SearchPropertiesQueryVariables>(SearchPropertiesDocument, options);
      }
export function useSearchPropertiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPropertiesQuery, SearchPropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPropertiesQuery, SearchPropertiesQueryVariables>(SearchPropertiesDocument, options);
        }
export function useSearchPropertiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchPropertiesQuery, SearchPropertiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchPropertiesQuery, SearchPropertiesQueryVariables>(SearchPropertiesDocument, options);
        }
export type SearchPropertiesQueryHookResult = ReturnType<typeof useSearchPropertiesQuery>;
export type SearchPropertiesLazyQueryHookResult = ReturnType<typeof useSearchPropertiesLazyQuery>;
export type SearchPropertiesSuspenseQueryHookResult = ReturnType<typeof useSearchPropertiesSuspenseQuery>;
export type SearchPropertiesQueryResult = Apollo.QueryResult<SearchPropertiesQuery, SearchPropertiesQueryVariables>;
export const GetPropertiesDocument = gql`
    query GetProperties {
  getProperties {
    success
    message
    properties {
      id
      title
      description
      host {
        name
        image
      }
      location {
        city
        district
        address
        lat
        lng
      }
      pricePerMonth
      roomCount
      shared
      maxRoommates
      images
      amenities
      propertyType
      availableFrom
      availableTo
      isActive
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

/**
 * __useGetPropertiesQuery__
 *
 * To run a query within a React component, call `useGetPropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPropertiesQuery(baseOptions?: Apollo.QueryHookOptions<GetPropertiesQuery, GetPropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertiesQuery, GetPropertiesQueryVariables>(GetPropertiesDocument, options);
      }
export function useGetPropertiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertiesQuery, GetPropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertiesQuery, GetPropertiesQueryVariables>(GetPropertiesDocument, options);
        }
export function useGetPropertiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPropertiesQuery, GetPropertiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertiesQuery, GetPropertiesQueryVariables>(GetPropertiesDocument, options);
        }
export type GetPropertiesQueryHookResult = ReturnType<typeof useGetPropertiesQuery>;
export type GetPropertiesLazyQueryHookResult = ReturnType<typeof useGetPropertiesLazyQuery>;
export type GetPropertiesSuspenseQueryHookResult = ReturnType<typeof useGetPropertiesSuspenseQuery>;
export type GetPropertiesQueryResult = Apollo.QueryResult<GetPropertiesQuery, GetPropertiesQueryVariables>;
export const GetPropertiesByHostDocument = gql`
    query GetPropertiesByHost($hostId: ID!) {
  getPropertiesByHost(hostId: $hostId) {
    success
    message
    properties {
      id
      title
      description
      host {
        name
        image
      }
      location {
        city
        district
        address
        lat
        lng
      }
      pricePerMonth
      roomCount
      shared
      maxRoommates
      images
      amenities
      propertyType
      availableFrom
      availableTo
      isActive
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

/**
 * __useGetPropertiesByHostQuery__
 *
 * To run a query within a React component, call `useGetPropertiesByHostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertiesByHostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertiesByHostQuery({
 *   variables: {
 *      hostId: // value for 'hostId'
 *   },
 * });
 */
export function useGetPropertiesByHostQuery(baseOptions: Apollo.QueryHookOptions<GetPropertiesByHostQuery, GetPropertiesByHostQueryVariables> & ({ variables: GetPropertiesByHostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertiesByHostQuery, GetPropertiesByHostQueryVariables>(GetPropertiesByHostDocument, options);
      }
export function useGetPropertiesByHostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertiesByHostQuery, GetPropertiesByHostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertiesByHostQuery, GetPropertiesByHostQueryVariables>(GetPropertiesByHostDocument, options);
        }
export function useGetPropertiesByHostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPropertiesByHostQuery, GetPropertiesByHostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertiesByHostQuery, GetPropertiesByHostQueryVariables>(GetPropertiesByHostDocument, options);
        }
export type GetPropertiesByHostQueryHookResult = ReturnType<typeof useGetPropertiesByHostQuery>;
export type GetPropertiesByHostLazyQueryHookResult = ReturnType<typeof useGetPropertiesByHostLazyQuery>;
export type GetPropertiesByHostSuspenseQueryHookResult = ReturnType<typeof useGetPropertiesByHostSuspenseQuery>;
export type GetPropertiesByHostQueryResult = Apollo.QueryResult<GetPropertiesByHostQuery, GetPropertiesByHostQueryVariables>;
export const UpdatePropertyDocument = gql`
    mutation UpdateProperty($input: UpdatePropertyInput!) {
  updateProperty(input: $input) {
    success
    message
    property {
      id
      title
      description
      host {
        id
      }
      location {
        city
        district
        address
        lat
        lng
      }
      pricePerMonth
      roomCount
      shared
      maxRoommates
      images
      amenities
      propertyType
      availableFrom
      availableTo
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdatePropertyMutationFn = Apollo.MutationFunction<UpdatePropertyMutation, UpdatePropertyMutationVariables>;

/**
 * __useUpdatePropertyMutation__
 *
 * To run a mutation, you first call `useUpdatePropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePropertyMutation, { data, loading, error }] = useUpdatePropertyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePropertyMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePropertyMutation, UpdatePropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePropertyMutation, UpdatePropertyMutationVariables>(UpdatePropertyDocument, options);
      }
export type UpdatePropertyMutationHookResult = ReturnType<typeof useUpdatePropertyMutation>;
export type UpdatePropertyMutationResult = Apollo.MutationResult<UpdatePropertyMutation>;
export type UpdatePropertyMutationOptions = Apollo.BaseMutationOptions<UpdatePropertyMutation, UpdatePropertyMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    success
    message
    user {
      id
      name
      email
      phone
      image
      bio
      age
      gender
      role
      createdAt
      updatedAt
    }
    token
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    success
    message
    user {
      id
      name
      email
      phone
      image
      bio
      age
      gender
      role
      createdAt
      updatedAt
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    success
    message
    user {
      id
      name
      email
      phone
      image
      bio
      age
      gender
      role
      createdAt
      updatedAt
    }
    token
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      getUserId: // value for 'getUserId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;