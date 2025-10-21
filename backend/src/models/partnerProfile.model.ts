import { model, Schema, models } from "mongoose";
import {
  PartnerProfile,
  Lifestyle,
  GederPreference,
} from "../types/partnerProfile.types";

const PartnerProfileSchema = new Schema<PartnerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    targetPropertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: null,
      index: true,
    },
    preferredLocation: { type: String },
    budgetMin: { type: Number },
    budgetMax: { type: Number },
    moveInDate: { type: String },
    stayDurationMonths: { type: Number },
    roommateCount: { type: Number },
    genderPreference: {
      type: String,
      enum: ["MALE", "FEMALE", "ANY"] as GederPreference[],
    },
    lifestyle: {
      type: [String],
      enum: [
        "CLEAN",
        "MESSY",
        "QUIET",
        "SOCIAL",
        "PET_FRIENDLY",
        "NO_PETS",
        "SMOKER",
        "NON_SMOKER",
        "EARLY_BIRD",
        "NIGHT_OWL",
        "VEGETARIAN",
        "NON_VEGETARIAN",
        "WORK_FROM_HOME",
        "OUT_OF_HOME",
        "INTROVERT",
        "EXTROVERT",
        "MUSIC_LOVER",
        "PARTY_FRIENDLY",
        "RELIGIOUS",
        "NON_RELIGIOUS",
      ] as Lifestyle[],
      default: [],
    },
    about: { type: String },
    isLookingForPartner: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Helpful indexes for search/use cases
PartnerProfileSchema.index({ userId: 1 });
PartnerProfileSchema.index({ targetPropertyId: 1 });
PartnerProfileSchema.index({ isLookingForPartner: 1 });
PartnerProfileSchema.index({ createdAt: -1 });

export const PartnerProfileModel =
  models["PartnerProfile"] ||
  model<PartnerProfile>("PartnerProfile", PartnerProfileSchema);
