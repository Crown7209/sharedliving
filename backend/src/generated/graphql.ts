import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../handler';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type Gender =
  | 'female'
  | 'male'
  | 'other'
  | '%future added value';

export type GenderPreferenceEnum =
  | 'ANY'
  | 'FEMALE'
  | 'MALE'
  | '%future added value';

export type Host = {
  id: Scalars['ID']['output'];
  image: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type InterestStatusEnum =
  | 'INTERESTED'
  | 'SKIPPED'
  | '%future added value';

export type LifestyleEnum =
  | 'CLEAN'
  | 'EARLY_BIRD'
  | 'EXTROVERT'
  | 'INTROVERT'
  | 'MESSY'
  | 'MUSIC_LOVER'
  | 'NIGHT_OWL'
  | 'NON_RELIGIOUS'
  | 'NON_SMOKER'
  | 'NON_VEGETARIAN'
  | 'NO_PETS'
  | 'OUT_OF_HOME'
  | 'PARTY_FRIENDLY'
  | 'PET_FRIENDLY'
  | 'QUIET'
  | 'RELIGIOUS'
  | 'SMOKER'
  | 'SOCIAL'
  | 'VEGETARIAN'
  | 'WORK_FROM_HOME'
  | '%future added value';

export type Location = {
  address: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  district: Scalars['String']['output'];
  lat: Maybe<Scalars['Float']['output']>;
  lng: Maybe<Scalars['Float']['output']>;
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
  _empty: Maybe<Scalars['String']['output']>;
  createPartnerInterest: Maybe<PartnerInterestResponse>;
  createPartnerMatch: Maybe<PartnerMatchResponse>;
  createPartnerProfile: Maybe<PartnerProfileResponse>;
  createProperty: Maybe<PropertyResponse>;
  createUser: Maybe<UserResponse>;
  deletePartnerInterest: Maybe<PartnerInterestResponse>;
  deletePartnerMatch: Maybe<PartnerMatchResponse>;
  deletePartnerProfile: Maybe<PartnerProfileResponse>;
  deleteProperty: Maybe<PropertyResponse>;
  deleteUser: Maybe<UserResponse>;
  login: Maybe<UserResponse>;
  updatePartnerInterest: Maybe<PartnerInterestResponse>;
  updatePartnerMatch: Maybe<PartnerMatchResponse>;
  updatePartnerProfile: Maybe<PartnerProfileResponse>;
  updateProperty: Maybe<PropertyResponse>;
  updateUser: Maybe<UserResponse>;
};


export type Mutation_CreatePartnerInterestArgs = {
  input: CreatePartnerInterestInput;
};


export type Mutation_CreatePartnerMatchArgs = {
  input: CreatePartnerMatchInput;
};


export type Mutation_CreatePartnerProfileArgs = {
  input: CreatePartnerProfileInput;
};


export type Mutation_CreatePropertyArgs = {
  input: CreatePropertyInput;
};


export type Mutation_CreateUserArgs = {
  input: CreateUserInput;
};


export type Mutation_DeletePartnerInterestArgs = {
  id: Scalars['ID']['input'];
};


export type Mutation_DeletePartnerMatchArgs = {
  id: Scalars['ID']['input'];
};


export type Mutation_DeletePartnerProfileArgs = {
  id: Scalars['ID']['input'];
};


export type Mutation_DeletePropertyArgs = {
  id: Scalars['ID']['input'];
};


export type Mutation_DeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type Mutation_LoginArgs = {
  input: LoginInput;
};


export type Mutation_UpdatePartnerInterestArgs = {
  input: UpdatePartnerInterestInput;
};


export type Mutation_UpdatePartnerMatchArgs = {
  input: UpdatePartnerMatchInput;
};


export type Mutation_UpdatePartnerProfileArgs = {
  input: UpdatePartnerProfileInput;
};


export type Mutation_UpdatePropertyArgs = {
  input: UpdatePropertyInput;
};


export type Mutation_UpdateUserArgs = {
  input: UpdateUserInput;
};

export type PartnerInterest = {
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  propertyId: Maybe<Scalars['ID']['output']>;
  status: InterestStatusEnum;
  targetUserId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type PartnerInterestResponse = {
  interest: Maybe<PartnerInterest>;
  match: Maybe<PartnerMatch>;
  matchCreated: Maybe<Scalars['Boolean']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type PartnerInterestsResponse = {
  interests: Array<PartnerInterest>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PartnerMatch = {
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  propertyId: Maybe<Scalars['ID']['output']>;
  status: PartnerMatchStatusEnum;
  updatedAt: Scalars['String']['output'];
  userAId: Scalars['ID']['output'];
  userBId: Scalars['ID']['output'];
};

export type PartnerMatchResponse = {
  match: Maybe<PartnerMatch>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type PartnerMatchStatusEnum =
  | 'DECLINED'
  | 'MATCHED'
  | 'PENDING'
  | '%future added value';

export type PartnerMatchesResponse = {
  matches: Array<PartnerMatch>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PartnerProfile = {
  about: Maybe<Scalars['String']['output']>;
  budgetMax: Maybe<Scalars['Float']['output']>;
  budgetMin: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['String']['output'];
  genderPreference: Maybe<GenderPreferenceEnum>;
  id: Scalars['ID']['output'];
  isLookingForPartner: Scalars['Boolean']['output'];
  lifestyle: Maybe<Array<LifestyleEnum>>;
  moveInDate: Maybe<Scalars['String']['output']>;
  preferredLocation: Maybe<Scalars['String']['output']>;
  roommateCount: Maybe<Scalars['Int']['output']>;
  stayDurationMonths: Maybe<Scalars['Int']['output']>;
  targetPropertyId: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['String']['output'];
  user: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export type PartnerProfileResponse = {
  message: Scalars['String']['output'];
  profile: Maybe<PartnerProfile>;
  success: Scalars['Boolean']['output'];
};

export type PartnerProfilesResponse = {
  message: Scalars['String']['output'];
  profiles: Array<PartnerProfile>;
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PrivacyType =
  | 'entire_place'
  | 'private_room'
  | 'shared_room'
  | '%future added value';

export type PropertiesResponse = {
  message: Scalars['String']['output'];
  properties: Array<Property>;
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Property = {
  amenities: Maybe<Array<Scalars['String']['output']>>;
  availableFrom: Scalars['String']['output'];
  availableTo: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Maybe<Scalars['String']['output']>;
  host: Host;
  id: Scalars['ID']['output'];
  images: Maybe<Array<Scalars['String']['output']>>;
  isActive: Scalars['Boolean']['output'];
  location: Location;
  maxRoommates: Maybe<Scalars['Int']['output']>;
  pricePerMonth: Scalars['Float']['output'];
  privacyType: Maybe<PrivacyType>;
  propertyType: Maybe<PropertyType>;
  roomCount: Scalars['Int']['output'];
  shared: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PropertyResponse = {
  message: Scalars['String']['output'];
  property: Maybe<Property>;
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

export type PropertyType =
  | 'apartment'
  | 'house'
  | 'other'
  | 'studio'
  | '%future added value';

export type Query = {
  _empty: Maybe<Scalars['String']['output']>;
  checkMutualInterest: Maybe<PartnerInterestResponse>;
  getPartnerInterest: Maybe<PartnerInterestResponse>;
  getPartnerInterestsByTarget: Maybe<PartnerInterestsResponse>;
  getPartnerInterestsByUser: Maybe<PartnerInterestsResponse>;
  getPartnerMatch: Maybe<PartnerMatchResponse>;
  getPartnerMatchesByProperty: Maybe<PartnerMatchesResponse>;
  getPartnerMatchesByUser: Maybe<PartnerMatchesResponse>;
  getPartnerProfile: Maybe<PartnerProfileResponse>;
  getPartnerProfiles: Maybe<PartnerProfilesResponse>;
  getPartnerProfilesByUser: Maybe<PartnerProfilesResponse>;
  getProperties: Maybe<PropertiesResponse>;
  getPropertiesByHost: Maybe<PropertiesResponse>;
  getProperty: Maybe<PropertyResponse>;
  getUser: Maybe<UserResponse>;
  getUserProfile: Maybe<UserResponse>;
  getUsers: Maybe<UsersResponse>;
  searchProperties: Maybe<PropertiesResponse>;
};


export type Query_CheckMutualInterestArgs = {
  userAId: Scalars['ID']['input'];
  userBId: Scalars['ID']['input'];
};


export type Query_GetPartnerInterestArgs = {
  id: Scalars['ID']['input'];
};


export type Query_GetPartnerInterestsByTargetArgs = {
  targetUserId: Scalars['ID']['input'];
};


export type Query_GetPartnerInterestsByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type Query_GetPartnerMatchArgs = {
  id: Scalars['ID']['input'];
};


export type Query_GetPartnerMatchesByPropertyArgs = {
  propertyId: Scalars['ID']['input'];
};


export type Query_GetPartnerMatchesByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type Query_GetPartnerProfileArgs = {
  id: Scalars['ID']['input'];
};


export type Query_GetPartnerProfilesByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type Query_GetPropertiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type Query_GetPropertiesByHostArgs = {
  hostId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type Query_GetPropertyArgs = {
  id: Scalars['ID']['input'];
};


export type Query_GetUserArgs = {
  id: Scalars['ID']['input'];
};


export type Query_GetUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<UserRole>;
};


export type Query_SearchPropertiesArgs = {
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
  age: Maybe<Scalars['Int']['output']>;
  bio: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  gender: Maybe<Gender>;
  id: Scalars['ID']['output'];
  image: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updatedAt: Scalars['String']['output'];
};

export type UserResponse = {
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token: Maybe<Scalars['String']['output']>;
  user: Maybe<User>;
};

export type UserRole =
  | 'landlord'
  | 'renter'
  | '%future added value';

export type UsersResponse = {
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
  users: Array<User>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreatePartnerInterestInput: CreatePartnerInterestInput;
  CreatePartnerMatchInput: CreatePartnerMatchInput;
  CreatePartnerProfileInput: CreatePartnerProfileInput;
  CreatePropertyInput: CreatePropertyInput;
  CreateUserInput: CreateUserInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Gender: Gender;
  GenderPreferenceEnum: GenderPreferenceEnum;
  Host: ResolverTypeWrapper<Host>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InterestStatusEnum: InterestStatusEnum;
  LifestyleEnum: LifestyleEnum;
  Location: ResolverTypeWrapper<Location>;
  LocationInput: LocationInput;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  PartnerInterest: ResolverTypeWrapper<PartnerInterest>;
  PartnerInterestResponse: ResolverTypeWrapper<PartnerInterestResponse>;
  PartnerInterestsResponse: ResolverTypeWrapper<PartnerInterestsResponse>;
  PartnerMatch: ResolverTypeWrapper<PartnerMatch>;
  PartnerMatchResponse: ResolverTypeWrapper<PartnerMatchResponse>;
  PartnerMatchStatusEnum: PartnerMatchStatusEnum;
  PartnerMatchesResponse: ResolverTypeWrapper<PartnerMatchesResponse>;
  PartnerProfile: ResolverTypeWrapper<PartnerProfile>;
  PartnerProfileResponse: ResolverTypeWrapper<PartnerProfileResponse>;
  PartnerProfilesResponse: ResolverTypeWrapper<PartnerProfilesResponse>;
  PrivacyType: PrivacyType;
  PropertiesResponse: ResolverTypeWrapper<PropertiesResponse>;
  Property: ResolverTypeWrapper<Property>;
  PropertyResponse: ResolverTypeWrapper<PropertyResponse>;
  PropertySearchInput: PropertySearchInput;
  PropertyType: PropertyType;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdatePartnerInterestInput: UpdatePartnerInterestInput;
  UpdatePartnerMatchInput: UpdatePartnerMatchInput;
  UpdatePartnerProfileInput: UpdatePartnerProfileInput;
  UpdatePropertyInput: UpdatePropertyInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UserRole: UserRole;
  UsersResponse: ResolverTypeWrapper<UsersResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreatePartnerInterestInput: CreatePartnerInterestInput;
  CreatePartnerMatchInput: CreatePartnerMatchInput;
  CreatePartnerProfileInput: CreatePartnerProfileInput;
  CreatePropertyInput: CreatePropertyInput;
  CreateUserInput: CreateUserInput;
  Float: Scalars['Float']['output'];
  Host: Host;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Location: Location;
  LocationInput: LocationInput;
  LoginInput: LoginInput;
  Mutation: {};
  PartnerInterest: PartnerInterest;
  PartnerInterestResponse: PartnerInterestResponse;
  PartnerInterestsResponse: PartnerInterestsResponse;
  PartnerMatch: PartnerMatch;
  PartnerMatchResponse: PartnerMatchResponse;
  PartnerMatchesResponse: PartnerMatchesResponse;
  PartnerProfile: PartnerProfile;
  PartnerProfileResponse: PartnerProfileResponse;
  PartnerProfilesResponse: PartnerProfilesResponse;
  PropertiesResponse: PropertiesResponse;
  Property: Property;
  PropertyResponse: PropertyResponse;
  PropertySearchInput: PropertySearchInput;
  Query: {};
  String: Scalars['String']['output'];
  UpdatePartnerInterestInput: UpdatePartnerInterestInput;
  UpdatePartnerMatchInput: UpdatePartnerMatchInput;
  UpdatePartnerProfileInput: UpdatePartnerProfileInput;
  UpdatePropertyInput: UpdatePropertyInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserResponse: UserResponse;
  UsersResponse: UsersResponse;
}>;

export type HostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Host'] = ResolversParentTypes['Host']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  district?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createPartnerInterest?: Resolver<Maybe<ResolversTypes['PartnerInterestResponse']>, ParentType, ContextType, RequireFields<Mutation_CreatePartnerInterestArgs, 'input'>>;
  createPartnerMatch?: Resolver<Maybe<ResolversTypes['PartnerMatchResponse']>, ParentType, ContextType, RequireFields<Mutation_CreatePartnerMatchArgs, 'input'>>;
  createPartnerProfile?: Resolver<Maybe<ResolversTypes['PartnerProfileResponse']>, ParentType, ContextType, RequireFields<Mutation_CreatePartnerProfileArgs, 'input'>>;
  createProperty?: Resolver<Maybe<ResolversTypes['PropertyResponse']>, ParentType, ContextType, RequireFields<Mutation_CreatePropertyArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<Mutation_CreateUserArgs, 'input'>>;
  deletePartnerInterest?: Resolver<Maybe<ResolversTypes['PartnerInterestResponse']>, ParentType, ContextType, RequireFields<Mutation_DeletePartnerInterestArgs, 'id'>>;
  deletePartnerMatch?: Resolver<Maybe<ResolversTypes['PartnerMatchResponse']>, ParentType, ContextType, RequireFields<Mutation_DeletePartnerMatchArgs, 'id'>>;
  deletePartnerProfile?: Resolver<Maybe<ResolversTypes['PartnerProfileResponse']>, ParentType, ContextType, RequireFields<Mutation_DeletePartnerProfileArgs, 'id'>>;
  deleteProperty?: Resolver<Maybe<ResolversTypes['PropertyResponse']>, ParentType, ContextType, RequireFields<Mutation_DeletePropertyArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<Mutation_DeleteUserArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<Mutation_LoginArgs, 'input'>>;
  updatePartnerInterest?: Resolver<Maybe<ResolversTypes['PartnerInterestResponse']>, ParentType, ContextType, RequireFields<Mutation_UpdatePartnerInterestArgs, 'input'>>;
  updatePartnerMatch?: Resolver<Maybe<ResolversTypes['PartnerMatchResponse']>, ParentType, ContextType, RequireFields<Mutation_UpdatePartnerMatchArgs, 'input'>>;
  updatePartnerProfile?: Resolver<Maybe<ResolversTypes['PartnerProfileResponse']>, ParentType, ContextType, RequireFields<Mutation_UpdatePartnerProfileArgs, 'input'>>;
  updateProperty?: Resolver<Maybe<ResolversTypes['PropertyResponse']>, ParentType, ContextType, RequireFields<Mutation_UpdatePropertyArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<Mutation_UpdateUserArgs, 'input'>>;
}>;

export type PartnerInterestResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PartnerInterest'] = ResolversParentTypes['PartnerInterest']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  propertyId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['InterestStatusEnum'], ParentType, ContextType>;
  targetUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PartnerInterestResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PartnerInterestResponse'] = ResolversParentTypes['PartnerInterestResponse']> = ResolversObject<{
  interest?: Resolver<Maybe<ResolversTypes['PartnerInterest']>, ParentType, ContextType>;
  match?: Resolver<Maybe<ResolversTypes['PartnerMatch']>, ParentType, ContextType>;
  matchCreated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PartnerInterestsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PartnerInterestsResponse'] = ResolversParentTypes['PartnerInterestsResponse']> = ResolversObject<{
  interests?: Resolver<Array<ResolversTypes['PartnerInterest']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PartnerMatchResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PartnerMatch'] = ResolversParentTypes['PartnerMatch']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  propertyId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['PartnerMatchStatusEnum'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userAId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userBId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PartnerMatchResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PartnerMatchResponse'] = ResolversParentTypes['PartnerMatchResponse']> = ResolversObject<{
  match?: Resolver<Maybe<ResolversTypes['PartnerMatch']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PartnerMatchesResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PartnerMatchesResponse'] = ResolversParentTypes['PartnerMatchesResponse']> = ResolversObject<{
  matches?: Resolver<Array<ResolversTypes['PartnerMatch']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PartnerProfileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PartnerProfile'] = ResolversParentTypes['PartnerProfile']> = ResolversObject<{
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  budgetMax?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  budgetMin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genderPreference?: Resolver<Maybe<ResolversTypes['GenderPreferenceEnum']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isLookingForPartner?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lifestyle?: Resolver<Maybe<Array<ResolversTypes['LifestyleEnum']>>, ParentType, ContextType>;
  moveInDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferredLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roommateCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  stayDurationMonths?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  targetPropertyId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PartnerProfileResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PartnerProfileResponse'] = ResolversParentTypes['PartnerProfileResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['PartnerProfile']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PartnerProfilesResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PartnerProfilesResponse'] = ResolversParentTypes['PartnerProfilesResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profiles?: Resolver<Array<ResolversTypes['PartnerProfile']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertiesResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PropertiesResponse'] = ResolversParentTypes['PropertiesResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  properties?: Resolver<Array<ResolversTypes['Property']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = ResolversObject<{
  amenities?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  availableFrom?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  availableTo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  host?: Resolver<ResolversTypes['Host'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  maxRoommates?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pricePerMonth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  privacyType?: Resolver<Maybe<ResolversTypes['PrivacyType']>, ParentType, ContextType>;
  propertyType?: Resolver<Maybe<ResolversTypes['PropertyType']>, ParentType, ContextType>;
  roomCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shared?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PropertyResponse'] = ResolversParentTypes['PropertyResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  checkMutualInterest?: Resolver<Maybe<ResolversTypes['PartnerInterestResponse']>, ParentType, ContextType, RequireFields<Query_CheckMutualInterestArgs, 'userAId' | 'userBId'>>;
  getPartnerInterest?: Resolver<Maybe<ResolversTypes['PartnerInterestResponse']>, ParentType, ContextType, RequireFields<Query_GetPartnerInterestArgs, 'id'>>;
  getPartnerInterestsByTarget?: Resolver<Maybe<ResolversTypes['PartnerInterestsResponse']>, ParentType, ContextType, RequireFields<Query_GetPartnerInterestsByTargetArgs, 'targetUserId'>>;
  getPartnerInterestsByUser?: Resolver<Maybe<ResolversTypes['PartnerInterestsResponse']>, ParentType, ContextType, RequireFields<Query_GetPartnerInterestsByUserArgs, 'userId'>>;
  getPartnerMatch?: Resolver<Maybe<ResolversTypes['PartnerMatchResponse']>, ParentType, ContextType, RequireFields<Query_GetPartnerMatchArgs, 'id'>>;
  getPartnerMatchesByProperty?: Resolver<Maybe<ResolversTypes['PartnerMatchesResponse']>, ParentType, ContextType, RequireFields<Query_GetPartnerMatchesByPropertyArgs, 'propertyId'>>;
  getPartnerMatchesByUser?: Resolver<Maybe<ResolversTypes['PartnerMatchesResponse']>, ParentType, ContextType, RequireFields<Query_GetPartnerMatchesByUserArgs, 'userId'>>;
  getPartnerProfile?: Resolver<Maybe<ResolversTypes['PartnerProfileResponse']>, ParentType, ContextType, RequireFields<Query_GetPartnerProfileArgs, 'id'>>;
  getPartnerProfiles?: Resolver<Maybe<ResolversTypes['PartnerProfilesResponse']>, ParentType, ContextType>;
  getPartnerProfilesByUser?: Resolver<Maybe<ResolversTypes['PartnerProfilesResponse']>, ParentType, ContextType, RequireFields<Query_GetPartnerProfilesByUserArgs, 'userId'>>;
  getProperties?: Resolver<Maybe<ResolversTypes['PropertiesResponse']>, ParentType, ContextType, Partial<Query_GetPropertiesArgs>>;
  getPropertiesByHost?: Resolver<Maybe<ResolversTypes['PropertiesResponse']>, ParentType, ContextType, RequireFields<Query_GetPropertiesByHostArgs, 'hostId'>>;
  getProperty?: Resolver<Maybe<ResolversTypes['PropertyResponse']>, ParentType, ContextType, RequireFields<Query_GetPropertyArgs, 'id'>>;
  getUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<Query_GetUserArgs, 'id'>>;
  getUserProfile?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  getUsers?: Resolver<Maybe<ResolversTypes['UsersResponse']>, ParentType, ContextType, Partial<Query_GetUsersArgs>>;
  searchProperties?: Resolver<Maybe<ResolversTypes['PropertiesResponse']>, ParentType, ContextType, RequireFields<Query_SearchPropertiesArgs, 'input'>>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UsersResponse'] = ResolversParentTypes['UsersResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Host?: HostResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PartnerInterest?: PartnerInterestResolvers<ContextType>;
  PartnerInterestResponse?: PartnerInterestResponseResolvers<ContextType>;
  PartnerInterestsResponse?: PartnerInterestsResponseResolvers<ContextType>;
  PartnerMatch?: PartnerMatchResolvers<ContextType>;
  PartnerMatchResponse?: PartnerMatchResponseResolvers<ContextType>;
  PartnerMatchesResponse?: PartnerMatchesResponseResolvers<ContextType>;
  PartnerProfile?: PartnerProfileResolvers<ContextType>;
  PartnerProfileResponse?: PartnerProfileResponseResolvers<ContextType>;
  PartnerProfilesResponse?: PartnerProfilesResponseResolvers<ContextType>;
  PropertiesResponse?: PropertiesResponseResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  PropertyResponse?: PropertyResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UsersResponse?: UsersResponseResolvers<ContextType>;
}>;

