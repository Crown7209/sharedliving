import mongoose from "mongoose";

// Get MongoDB URI from environment variable or use default
const MONGO_URI = process.env.MONGO_URI;

export async function connectToDatabase() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI орчинд тохируулаагүй байна.");
  }
  try {
    await mongoose.connect(MONGO_URI, {
      autoCreate: true,
    });
  } catch {
    throw new Error("Could not connect to MongoDB");
  }
}
