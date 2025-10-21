import { Types } from "mongoose";

export type InterestStatus = "INTERESTED" | "SKIPPED";

export type PartnerInterest = {
  id: string;
  userId: Types.ObjectId; // User who expressed interest
  targetUserId: Types.ObjectId; // Partner profile owner
  propertyId?: Types.ObjectId | null; // Optional property context
  status: InterestStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreatePartnerInterestInput = {
  userId: string;
  targetUserId: string;
  propertyId?: string | null;
  status: InterestStatus;
};

export type UpdatePartnerInterestInput = {
  id: string;
  status: InterestStatus;
};

export type PartnerInterestResponse = {
  success: boolean;
  message: string;
  interest?: PartnerInterest;
  matchCreated?: boolean;
  match?: unknown;
};
