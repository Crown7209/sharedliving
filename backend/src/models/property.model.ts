import { model, Schema, models } from "mongoose";
import { Property, PropertyType, PrivacyType } from "../types/property.types";

const LocationSchema = new Schema({
  city: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true },
  address: { type: String, trim: true },
  lat: { type: Number },
  lng: { type: Number },
});

const HostSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true },
  image: { type: String, default: "" },
});

const PropertySchema = new Schema<Property>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    host: { type: HostSchema, required: true },
    location: { type: LocationSchema, required: true },
    pricePerMonth: { type: Number, required: true, min: 0 },
    roomCount: { type: Number, required: true, min: 1 },
    shared: { type: Boolean, required: true, default: false },
    maxRoommates: { type: Number, min: 1 },
    images: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    propertyType: {
      type: String,
      enum: ["apartment", "house", "studio", "other"] as PropertyType[],
      default: "apartment",
    },
    privacyType: {
      type: String,
      enum: ["entire_place", "private_room", "shared_room"] as PrivacyType[],
      default: "entire_place",
    },
    availableFrom: { type: String, required: true },
    availableTo: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
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
PropertySchema.index({ "location.city": 1, "location.district": 1 });
PropertySchema.index({ pricePerMonth: 1 });
PropertySchema.index({ roomCount: 1 });
PropertySchema.index({ propertyType: 1 });
PropertySchema.index({ privacyType: 1 });
PropertySchema.index({ "host.id": 1 });
PropertySchema.index({ createdAt: -1 });
PropertySchema.index({ isActive: 1 });

export const PropertyModel =
  models["Property"] || model<Property>("Property", PropertySchema);
