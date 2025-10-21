import { PartnerInterestModel } from "../../models/partnerInterest.model";
import { PartnerMatchModel } from "../../models/partnerMatch.model";
import { Types, isValidObjectId } from "mongoose";
import {
  CreatePartnerInterestInput,
  UpdatePartnerInterestInput,
  PartnerInterestResponse,
} from "../../types/partnerInterest.types";

export const partnerInterestMutations = {
  async createPartnerInterest(
    _: unknown,
    { input }: { input: CreatePartnerInterestInput }
  ): Promise<PartnerInterestResponse> {
    const { userId, targetUserId, propertyId, status } = input;

    if (!isValidObjectId(userId) || !isValidObjectId(targetUserId)) {
      return { success: false, message: "Invalid user IDs" };
    }

    if (propertyId && !isValidObjectId(propertyId)) {
      return { success: false, message: "Invalid property ID" };
    }

    // Check if interest already exists
    const existingInterest = await PartnerInterestModel.findOne({
      userId: new Types.ObjectId(userId),
      targetUserId: new Types.ObjectId(targetUserId),
    });

    if (existingInterest) {
      // Update existing interest
      const updatedInterest = await PartnerInterestModel.findByIdAndUpdate(
        existingInterest._id,
        { $set: { status } },
        { new: true }
      );
      return {
        success: true,
        message: "Interest updated",
        interest: updatedInterest,
      };
    }

    // Create new interest
    const interest = await PartnerInterestModel.create({
      userId: new Types.ObjectId(userId),
      targetUserId: new Types.ObjectId(targetUserId),
      propertyId: propertyId ? new Types.ObjectId(propertyId) : null,
      status,
    });

    // Check for mutual interest and create match if both are interested
    let matchCreated = false;
    let match = null;

    if (status === "INTERESTED") {
      const mutualInterest = await PartnerInterestModel.findOne({
        userId: new Types.ObjectId(targetUserId),
        targetUserId: new Types.ObjectId(userId),
        status: "INTERESTED",
      });

      if (mutualInterest) {
        // Check if match already exists
        const existingMatch = await PartnerMatchModel.findOne({
          $or: [
            {
              userAId: new Types.ObjectId(userId),
              userBId: new Types.ObjectId(targetUserId),
            },
            {
              userAId: new Types.ObjectId(targetUserId),
              userBId: new Types.ObjectId(userId),
            },
          ],
        });

        if (!existingMatch) {
          // Create new match
          match = await PartnerMatchModel.create({
            userAId: new Types.ObjectId(userId),
            userBId: new Types.ObjectId(targetUserId),
            propertyId: propertyId ? new Types.ObjectId(propertyId) : null,
            status: "MATCHED",
          });
          matchCreated = true;
        }
      }
    }

    return {
      success: true,
      message: "Interest created",
      interest,
      matchCreated,
      match,
    };
  },

  async updatePartnerInterest(
    _: unknown,
    { input }: { input: UpdatePartnerInterestInput }
  ): Promise<PartnerInterestResponse> {
    const { id, status } = input;

    if (!isValidObjectId(id)) {
      return { success: false, message: "Invalid interest ID" };
    }

    const interest = await PartnerInterestModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      { $set: { status } },
      { new: true }
    );

    if (!interest) {
      return { success: false, message: "Partner interest not found" };
    }

    return { success: true, message: "Interest updated", interest };
  },

  async deletePartnerInterest(
    _: unknown,
    { id }: { id: string }
  ): Promise<PartnerInterestResponse> {
    if (!isValidObjectId(id)) {
      return { success: false, message: "Invalid interest ID" };
    }

    const interest = await PartnerInterestModel.findByIdAndDelete(
      new Types.ObjectId(id)
    );

    if (!interest) {
      return { success: false, message: "Partner interest not found" };
    }

    return { success: true, message: "Interest deleted", interest };
  },
};
