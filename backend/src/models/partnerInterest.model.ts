import { model, Schema, models } from "mongoose";
import {
  PartnerInterest,
  InterestStatus,
} from "../types/partnerInterest.types";

const PartnerInterestSchema = new Schema<PartnerInterest>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    targetUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: null,
      index: true,
    },
    status: {
      type: String,
      enum: ["INTERESTED", "SKIPPED"] as InterestStatus[],
      required: true,
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

// Indexes for better query performance
PartnerInterestSchema.index({ userId: 1, targetUserId: 1 }, { unique: true });
PartnerInterestSchema.index({ userId: 1 });
PartnerInterestSchema.index({ targetUserId: 1 });
PartnerInterestSchema.index({ propertyId: 1 });
PartnerInterestSchema.index({ status: 1 });
PartnerInterestSchema.index({ createdAt: -1 });

export const PartnerInterestModel =
  models["PartnerInterest"] ||
  model<PartnerInterest>("PartnerInterest", PartnerInterestSchema);
