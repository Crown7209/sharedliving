import { UserModel } from "../../models/user.model";
import { UserResponse, UsersResponse } from "../../types/user.types";
import { Context } from "../../handler";

export const userQueries = {
  getUser: async (
    _: unknown,
    { id }: { id: string }
  ): Promise<UserResponse> => {
    try {
      const user = await UserModel.findById(id);

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      return {
        success: true,
        message: "User retrieved successfully",
        user: user.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },

  getUsers: async (
    _: unknown,
    {
      limit = 10,
      offset = 0,
      role,
    }: { limit?: number; offset?: number; role?: string }
  ): Promise<UsersResponse> => {
    try {
      const filter = role ? { role } : {};

      const users = await UserModel.find(filter)
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 });

      const totalCount = await UserModel.countDocuments(filter);

      return {
        success: true,
        message: "Users retrieved successfully",
        users: users.map((user) => user.toJSON()),
        totalCount,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving users: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        users: [],
        totalCount: 0,
      };
    }
  },

  getUserProfile: async (
    _: unknown,
    __: unknown,
    context: Context
  ): Promise<UserResponse> => {
    try {
      // This would typically get the user ID from the JWT token in context
      // For now, we'll assume the user ID is passed in context
      const userId = context.userId;

      if (!userId) {
        return {
          success: false,
          message: "Authentication required",
        };
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        return {
          success: false,
          message: "User profile not found",
        };
      }

      return {
        success: true,
        message: "User profile retrieved successfully",
        user: user.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving user profile: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },
};
