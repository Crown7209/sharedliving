import { model, Schema, models } from "mongoose";
import { PartnerMatch, PartnerMatchStatus } from "../types/partnerMatch.types";

const PartnerMatchSchema = new Schema<PartnerMatch>(
  {
    userAId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    userBId: {
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
      enum: ["PENDING", "MATCHED", "DECLINED"] as PartnerMatchStatus[],
      required: true,
      default: "PENDING",
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

PartnerMatchSchema.index({ userAId: 1, userBId: 1 }, { unique: true });
PartnerMatchSchema.index({ userAId: 1 });
PartnerMatchSchema.index({ userBId: 1 });
PartnerMatchSchema.index({ propertyId: 1 });
PartnerMatchSchema.index({ status: 1 });
PartnerMatchSchema.index({ createdAt: -1 });

export const PartnerMatchModel =
  models["PartnerMatch"] ||
  model<PartnerMatch>("PartnerMatch", PartnerMatchSchema);
