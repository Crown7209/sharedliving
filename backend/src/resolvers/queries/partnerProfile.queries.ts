import { PartnerProfileModel } from "../../models/partnerProfile.model";
import { UserModel } from "../../models/user.model";

export const partnerProfileQueries = {
  async getPartnerProfiles() {
    const profiles = await PartnerProfileModel.find({}).sort({ createdAt: -1 });

    // Manually populate user data
    const profilesWithUsers = await Promise.all(
      profiles.map(async (profile) => {
        const user = await UserModel.findById(profile.userId).select(
          "name email phone image bio age gender role registerNumber createdAt updatedAt"
        );
        return {
          ...profile.toJSON(),
          user,
        };
      })
    );

    return {
      success: true,
      message: "OK",
      profiles: profilesWithUsers,
      totalCount: profilesWithUsers.length,
    };
  },

  async getPartnerProfile(_: unknown, { id }: { id: string }) {
    const profile = await PartnerProfileModel.findById(id);
    if (!profile) {
      return { success: false, message: "Partner profile not found" };
    }

    // Manually populate user data
    const user = await UserModel.findById(profile.userId).select(
      "name email phone image bio age gender role registerNumber createdAt updatedAt"
    );

    const profileWithUser = {
      ...profile.toJSON(),
      user,
    };

    return { success: true, message: "OK", profile: profileWithUser };
  },

  async getPartnerProfilesByUser(_: unknown, { userId }: { userId: string }) {
    const profiles = await PartnerProfileModel.find({ userId }).sort({
      createdAt: -1,
    });

    // Manually populate user data
    const profilesWithUsers = await Promise.all(
      profiles.map(async (profile) => {
        const user = await UserModel.findById(profile.userId).select(
          "name email phone image bio age gender role registerNumber createdAt updatedAt"
        );
        return {
          ...profile.toJSON(),
          user,
        };
      })
    );

    return {
      success: true,
      message: "OK",
      profiles: profilesWithUsers,
      totalCount: profilesWithUsers.length,
    };
  },
};
