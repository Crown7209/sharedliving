import { Types } from "mongoose";

export type PartnerMatchStatus = "PENDING" | "MATCHED" | "DECLINED";

export type PartnerMatch = {
  id: string;
  userAId: Types.ObjectId;
  userBId: Types.ObjectId;
  propertyId?: Types.ObjectId | null;
  status: PartnerMatchStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreatePartnerMatchInput = {
  userAId: string;
  userBId: string;
  propertyId?: string | null;
  status: PartnerMatchStatus;
};

export type UpdatePartnerMatchInput = {
  id: string;
  status: PartnerMatchStatus;
};

export type PartnerMatchResponse = {
  success: boolean;
  message: string;
  match?: PartnerMatch;
};
