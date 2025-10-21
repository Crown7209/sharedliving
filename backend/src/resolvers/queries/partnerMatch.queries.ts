import { PartnerMatchModel } from "../../models/partnerMatch.model";
import { Types, isValidObjectId } from "mongoose";

export const partnerMatchQueries = {
  async getPartnerMatch(_: unknown, { id }: { id: string }) {
    if (!isValidObjectId(id)) {
      return { success: false, message: "Invalid match ID" };
    }

    const match = await PartnerMatchModel.findById(id);
    if (!match) {
      return { success: false, message: "Partner match not found" };
    }
    return { success: true, message: "OK", match };
  },

  async getPartnerMatchesByUser(_: unknown, { userId }: { userId: string }) {
    if (!isValidObjectId(userId)) {
      return {
        success: false,
        message: "Invalid userId",
        matches: [],
        totalCount: 0,
      };
    }

    const matches = await PartnerMatchModel.find({
      $or: [
        { userAId: new Types.ObjectId(userId) },
        { userBId: new Types.ObjectId(userId) },
      ],
    }).sort({ createdAt: -1 });

    return {
      success: true,
      message: "OK",
      matches,
      totalCount: matches.length,
    };
  },

  async getPartnerMatchesByProperty(
    _: unknown,
    { propertyId }: { propertyId: string }
  ) {
    if (!isValidObjectId(propertyId)) {
      return {
        success: false,
        message: "Invalid propertyId",
        matches: [],
        totalCount: 0,
      };
    }

    const matches = await PartnerMatchModel.find({
      propertyId: new Types.ObjectId(propertyId),
    }).sort({ createdAt: -1 });

    return {
      success: true,
      message: "OK",
      matches,
      totalCount: matches.length,
    };
  },
};
