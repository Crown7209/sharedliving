import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/user.model";
import {
  UserResponse,
  CreateUserInput,
  UpdateUserInput,
  LoginInput,
} from "../../types/user.types";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const userMutations = {
  createUser: async (
    _: unknown,
    { input }: { input: CreateUserInput }
  ): Promise<UserResponse> => {
    try {
      // Check if user already exists by email
      const existingUserByEmail = await UserModel.findOne({
        email: input.email,
      });

      if (existingUserByEmail) {
        return {
          success: false,
          message: "User with this email already exists",
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(input.password, 12);

      // Prepare user data - only include registerNumber if it's not empty
      const userData: Partial<CreateUserInput> & { password: string } = {
        name: input.name,
        email: input.email,
        password: hashedPassword,
        role: input.role,
      };

      // Only include optional fields if they have meaningful values
      if (input.phone && input.phone.trim() !== "" && input.phone !== "-/-") {
        userData.phone = input.phone;
      }

      if (input.image && input.image.trim() !== "") {
        userData.image = input.image;
      }

      if (input.bio && input.bio.length > 0) {
        userData.bio = input.bio;
      }

      if (input.age && input.age > 0) {
        userData.age = input.age;
      }

      if (input.gender) {
        userData.gender = input.gender;
      }

      // Create user
      const user = new UserModel(userData);

      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        success: true,
        message: "User created successfully",
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error creating user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },

  updateUser: async (
    _: unknown,
    { input }: { input: UpdateUserInput }
  ): Promise<UserResponse> => {
    try {
      const { id, ...updateData } = input;

      // If password is being updated, hash it
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 12);
      }

      const user = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      return {
        success: true,
        message: "User updated successfully",
        user: user.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Error updating user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },

  deleteUser: async (
    _: unknown,
    { id }: { id: string }
  ): Promise<UserResponse> => {
    try {
      const user = await UserModel.findByIdAndDelete(id);

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      return {
        success: true,
        message: "User deleted successfully",
        user: user.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Error deleting user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },

  login: async (
    _: unknown,
    { input }: { input: LoginInput }
  ): Promise<UserResponse> => {
    try {
      const { email, password } = input;

      // Find user by email
      const user = await UserModel.findOne({ email: email.toLowerCase() });

      if (!user) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        success: true,
        message: "Login successful",
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error during login: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },
};
