import { PartnerInterestModel } from "../../models/partnerInterest.model";
import { Types, isValidObjectId } from "mongoose";

export const partnerInterestQueries = {
  async getPartnerInterest(_: unknown, { id }: { id: string }) {
    if (!isValidObjectId(id)) {
      return { success: false, message: "Invalid interest ID" };
    }

    const interest = await PartnerInterestModel.findById(id);
    if (!interest) {
      return { success: false, message: "Partner interest not found" };
    }
    return { success: true, message: "OK", interest };
  },

  async getPartnerInterestsByUser(_: unknown, { userId }: { userId: string }) {
    if (!isValidObjectId(userId)) {
      return {
        success: false,
        message: "Invalid userId",
        interests: [],
        totalCount: 0,
      };
    }

    const interests = await PartnerInterestModel.find({
      userId: new Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    return {
      success: true,
      message: "OK",
      interests,
      totalCount: interests.length,
    };
  },

  async getPartnerInterestsByTarget(
    _: unknown,
    { targetUserId }: { targetUserId: string }
  ) {
    if (!isValidObjectId(targetUserId)) {
      return {
        success: false,
        message: "Invalid targetUserId",
        interests: [],
        totalCount: 0,
      };
    }

    const interests = await PartnerInterestModel.find({
      targetUserId: new Types.ObjectId(targetUserId),
    }).sort({ createdAt: -1 });

    return {
      success: true,
      message: "OK",
      interests,
      totalCount: interests.length,
    };
  },

  async checkMutualInterest(
    _: unknown,
    { userAId, userBId }: { userAId: string; userBId: string }
  ) {
    if (!isValidObjectId(userAId) || !isValidObjectId(userBId)) {
      return { success: false, message: "Invalid user IDs" };
    }

    const interestA = await PartnerInterestModel.findOne({
      userId: new Types.ObjectId(userAId),
      targetUserId: new Types.ObjectId(userBId),
      status: "INTERESTED",
    });

    const interestB = await PartnerInterestModel.findOne({
      userId: new Types.ObjectId(userBId),
      targetUserId: new Types.ObjectId(userAId),
      status: "INTERESTED",
    });

    const isMutual = !!(interestA && interestB);

    return {
      success: true,
      message: "OK",
      interest: interestA || interestB,
      matchCreated: isMutual,
    };
  },
};
