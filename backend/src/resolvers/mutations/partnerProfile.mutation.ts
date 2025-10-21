import { PartnerProfileModel } from "../../models/partnerProfile.model";
import {
  CreatePartnerProfileInput,
  UpdatePartnerProfileInput,
  PartnerProfileResponse,
} from "../../types/partnerProfile.types";

export const partnerProfileMutations = {
  async createPartnerProfile(
    _: unknown,
    { input }: { input: CreatePartnerProfileInput }
  ): Promise<PartnerProfileResponse> {
    const created = await PartnerProfileModel.create({ ...input });
    return { success: true, message: "Created", profile: created };
  },

  async updatePartnerProfile(
    _: unknown,
    { input }: { input: UpdatePartnerProfileInput }
  ): Promise<PartnerProfileResponse> {
    const { id, ...updates } = input;
    const updated = await PartnerProfileModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    if (!updated) {
      return { success: false, message: "Partner profile not found" };
    }
    return { success: true, message: "Updated", profile: updated };
  },

  async deletePartnerProfile(
    _: unknown,
    { id }: { id: string }
  ): Promise<PartnerProfileResponse> {
    const deleted = await PartnerProfileModel.findByIdAndDelete(id);
    if (!deleted) {
      return { success: false, message: "Partner profile not found" };
    }
    return { success: true, message: "Deleted", profile: deleted };
  },
};
