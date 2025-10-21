import { PartnerMatchModel } from "../../models/partnerMatch.model";
import { Types, isValidObjectId } from "mongoose";
import {
  CreatePartnerMatchInput,
  UpdatePartnerMatchInput,
  PartnerMatchResponse,
} from "../../types/partnerMatch.types";

export const partnerMatchMutations = {
  async createPartnerMatch(
    _: unknown,
    { input }: { input: CreatePartnerMatchInput }
  ): Promise<PartnerMatchResponse> {
    const { userAId, userBId, propertyId, status = "PENDING" } = input;

    if (!isValidObjectId(userAId) || !isValidObjectId(userBId)) {
      return { success: false, message: "Invalid user IDs" };
    }

    if (propertyId && !isValidObjectId(propertyId)) {
      return { success: false, message: "Invalid property ID" };
    }

    // Check if match already exists
    const existingMatch = await PartnerMatchModel.findOne({
      $or: [
        {
          userAId: new Types.ObjectId(userAId),
          userBId: new Types.ObjectId(userBId),
        },
        {
          userAId: new Types.ObjectId(userBId),
          userBId: new Types.ObjectId(userAId),
        },
      ],
    });

    if (existingMatch) {
      return {
        success: false,
        message: "Match already exists between these users",
      };
    }

    const match = await PartnerMatchModel.create({
      userAId: new Types.ObjectId(userAId),
      userBId: new Types.ObjectId(userBId),
      propertyId: propertyId ? new Types.ObjectId(propertyId) : null,
      status,
    });

    return { success: true, message: "Match created", match };
  },

  async updatePartnerMatch(
    _: unknown,
    { input }: { input: UpdatePartnerMatchInput }
  ): Promise<PartnerMatchResponse> {
    const { id, status } = input;

    if (!isValidObjectId(id)) {
      return { success: false, message: "Invalid match ID" };
    }

    const match = await PartnerMatchModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      { $set: { status } },
      { new: true }
    );

    if (!match) {
      return { success: false, message: "Partner match not found" };
    }

    return { success: true, message: "Match updated", match };
  },

  async deletePartnerMatch(_: unknown, { id }: { id: string }) {
    if (!isValidObjectId(id)) {
      return { success: false, message: "Invalid match ID" };
    }

    const match = await PartnerMatchModel.findByIdAndDelete(
      new Types.ObjectId(id)
    );

    if (!match) {
      return { success: false, message: "Partner match not found" };
    }

    return { success: true, message: "Match deleted", match };
  },
};
