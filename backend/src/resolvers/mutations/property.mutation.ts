import { PropertyModel } from "../../models/property.model";
import { UserModel } from "../../models/user.model";
import {
  PropertyResponse,
  CreatePropertyInput,
  UpdatePropertyInput,
} from "../../types/property.types";

export const propertyMutations = {
  createProperty: async (
    _: unknown,
    { input }: { input: CreatePropertyInput }
  ): Promise<PropertyResponse> => {
    try {
      const { hostId, ...propertyData } = input;

      // Verify host exists
      const host = await UserModel.findById(hostId);
      if (!host) {
        return {
          success: false,
          message: "Host not found",
        };
      }

      // Verify host is a landlord
      if (host.role !== "landlord") {
        return {
          success: false,
          message: "Only landlords can create properties",
        };
      }

      // Create property with host information and default values
      const property = new PropertyModel({
        title: propertyData.title || "",
        description: propertyData.description || "",
        location: propertyData.location || {
          city: "",
          district: "",
          address: "",
        },
        pricePerMonth: propertyData.pricePerMonth || 0,
        roomCount: propertyData.roomCount || 1,
        shared: propertyData.shared !== undefined ? propertyData.shared : false,
        maxRoommates: propertyData.maxRoommates || 1,
        images: propertyData.images || [],
        amenities: propertyData.amenities || [],
        propertyType: propertyData.propertyType || "apartment",
        privacyType: propertyData.privacyType || "entire_place",
        availableFrom: propertyData.availableFrom || "",
        availableTo: propertyData.availableTo || "",
        isActive:
          propertyData.isActive !== undefined ? propertyData.isActive : true,
        host: {
          id: hostId,
          name: host.name,
          image: host.image,
        },
      });

      await property.save();

      return {
        success: true,
        message: "Property created successfully",
        property: property.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Error creating property: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },

  updateProperty: async (
    _: unknown,
    { input }: { input: UpdatePropertyInput }
  ): Promise<PropertyResponse> => {
    try {
      const { id, ...updateData } = input;

      // Check if property exists
      const existingProperty = await PropertyModel.findById(id);
      if (!existingProperty) {
        return {
          success: false,
          message: "Property not found",
        };
      }

      // Update property
      const property = await PropertyModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).populate("host.id", "name image");

      if (!property) {
        return {
          success: false,
          message: "Property not found",
        };
      }

      return {
        success: true,
        message: "Property updated successfully",
        property: property.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Error updating property: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },

  deleteProperty: async (
    _: unknown,
    { id }: { id: string }
  ): Promise<PropertyResponse> => {
    try {
      const property = await PropertyModel.findByIdAndDelete(id);

      if (!property) {
        return {
          success: false,
          message: "Property not found",
        };
      }

      return {
        success: true,
        message: "Property deleted successfully",
        property: property.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Error deleting property: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },
};
