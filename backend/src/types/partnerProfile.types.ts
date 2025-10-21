import { Types } from "mongoose";

export type Lifestyle =
  | "CLEAN"
  | "MESSY"
  | "QUIET"
  | "SOCIAL"
  | "PET_FRIENDLY"
  | "NO_PETS"
  | "SMOKER"
  | "NON_SMOKER"
  | "EARLY_BIRD"
  | "NIGHT_OWL"
  | "VEGETARIAN"
  | "NON_VEGETARIAN"
  | "WORK_FROM_HOME"
  | "OUT_OF_HOME"
  | "INTROVERT"
  | "EXTROVERT"
  | "MUSIC_LOVER"
  | "PARTY_FRIENDLY"
  | "RELIGIOUS"
  | "NON_RELIGIOUS";

export type GederPreference = "MALE" | "FEMALE" | "ANY";

export type PartnerProfile = {
  id: string;
  userId: Types.ObjectId;
  targetPropertyId?: Types.ObjectId | null;
  preferredLocation?: string;
  budgetMin?: number;
  budgetMax?: number;
  moveInDate?: string;
  stayDurationMonths?: number;
  roommateCount?: number;
  genderPreference?: GederPreference;
  lifestyle?: Lifestyle[];
  about?: string;
  isLookingForPartner: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreatePartnerProfileInput = {
  userId: string;
  targetPropertyId?: string | null;
  preferredLocation?: string;
  budgetMin?: number;
  budgetMax?: number;
  moveInDate?: string;
  stayDurationMonths?: number;
  roommateCount?: number;
  genderPreference?: GederPreference;
  lifestyle?: Lifestyle[];
  about?: string;
  isLookingForPartner?: boolean;
};

export type UpdatePartnerProfileInput = {
  id: string;
  targetPropertyId?: string | null;
  preferredLocation?: string;
  budgetMin?: number;
  budgetMax?: number;
  moveInDate?: string;
  stayDurationMonths?: number;
  roommateCount?: number;
  genderPreference?: GederPreference;
  lifestyle?: Lifestyle[];
  about?: string;
  isLookingForPartner?: boolean;
};

export type PartnerProfileResponse = {
  success: boolean;
  message: string;
  profile?: PartnerProfile;
};
