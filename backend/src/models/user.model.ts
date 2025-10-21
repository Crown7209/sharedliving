import { model, Schema, models } from "mongoose";
import { User, UserRole, Gender } from "../types/user.types";

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, default: "" },
    bio: { type: [String], default: [] },
    age: { type: Number, min: 18, max: 100 },
    gender: {
      type: String,
      enum: ["male", "female", "other"] as Gender[],
    },
    role: {
      type: String,
      required: true,
      enum: ["landlord", "renter"] as UserRole[],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

export const UserModel = models["User"] || model<User>("User", UserSchema);
