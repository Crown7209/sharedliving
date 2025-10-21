import { userQueries } from "./queries/user.queries";
import { userMutations } from "./mutations/user.mutation";
import { propertyQueries } from "./queries/property.queries";
import { propertyMutations } from "./mutations/property.mutation";
import { partnerProfileQueries } from "./queries/partnerProfile.queries";
import { partnerProfileMutations } from "./mutations/partnerProfile.mutation";
import { partnerMatchQueries } from "./queries/partnerMatch.queries";
import { partnerMatchMutations } from "./mutations/partnerMatch.mutation";
import { partnerInterestQueries } from "./queries/partnerInterest.queries";
import { partnerInterestMutations } from "./mutations/partnerInterest.mutation";

export const resolvers = {
  Query: {
    ...userQueries,
    ...propertyQueries,
    ...partnerProfileQueries,
    ...partnerMatchQueries,
    ...partnerInterestQueries,
  },
  Mutation: {
    ...userMutations,
    ...propertyMutations,
    ...partnerProfileMutations,
    ...partnerMatchMutations,
    ...partnerInterestMutations,
  },
};
