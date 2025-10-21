import { PropertyModel } from "../../models/property.model";
import {
  PropertyResponse,
  PropertiesResponse,
  PropertySearchInput,
} from "../../types/property.types";

export const propertyQueries = {
  getProperty: async (
    _: unknown,
    { id }: { id: string }
  ): Promise<PropertyResponse> => {
    try {
      const property = await PropertyModel.findById(id).populate(
        "host.id",
        "name image"
      );

      if (!property) {
        return {
          success: false,
          message: "Property not found",
        };
      }

      return {
        success: true,
        message: "Property retrieved successfully",
        property: property.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving property: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },

  getProperties: async (
    _: unknown,
    { limit = 10, offset = 0 }: { limit?: number; offset?: number }
  ): Promise<PropertiesResponse> => {
    try {
      const properties = await PropertyModel.find()
        .populate("host.id", "name image")
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 });

      const totalCount = await PropertyModel.countDocuments();

      return {
        success: true,
        message: "Properties retrieved successfully",
        properties: properties.map((property) => property.toJSON()),
        totalCount,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving properties: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        properties: [],
        totalCount: 0,
      };
    }
  },

  searchProperties: async (
    _: unknown,
    { input }: { input: PropertySearchInput }
  ): Promise<PropertiesResponse> => {
    try {
      const {
        city,
        district,
        minPrice,
        maxPrice,
        roomCount,
        shared,
        propertyType,
        privacyType,
        amenities,
        availableFrom,
        availableTo,
        isActive,
        limit = 10,
        offset = 0,
      } = input;

      // Build filter object
      const filter: Record<string, unknown> = {};

      if (city) {
        filter["location.city"] = new RegExp(city, "i");
      }

      if (district) {
        filter["location.district"] = new RegExp(district, "i");
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        const priceFilter: Record<string, number> = {};
        if (minPrice !== undefined) priceFilter.$gte = minPrice;
        if (maxPrice !== undefined) priceFilter.$lte = maxPrice;
        filter.pricePerMonth = priceFilter;
      }

      if (roomCount !== undefined) {
        filter.roomCount = roomCount;
      }

      if (shared !== undefined) {
        filter.shared = shared;
      }

      if (propertyType) {
        filter.propertyType = propertyType;
      }

      if (privacyType) {
        filter.privacyType = privacyType;
      }

      if (amenities && amenities.length > 0) {
        filter.amenities = { $in: amenities };
      }

      if (availableFrom) {
        filter.availableFrom = { $lte: availableFrom };
      }

      if (availableTo) {
        filter.availableTo = { $gte: availableTo };
      }

      if (isActive !== undefined) {
        filter.isActive = isActive;
      }

      const properties = await PropertyModel.find(filter)
        .populate("host.id", "name image")
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 });

      const totalCount = await PropertyModel.countDocuments(filter);

      return {
        success: true,
        message: "Properties search completed successfully",
        properties: properties.map((property) => property.toJSON()),
        totalCount,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error searching properties: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        properties: [],
        totalCount: 0,
      };
    }
  },

  getPropertiesByHost: async (
    _: unknown,
    {
      hostId,
      limit = 10,
      offset = 0,
    }: { hostId: string; limit?: number; offset?: number }
  ): Promise<PropertiesResponse> => {
    try {
      const properties = await PropertyModel.find({ "host.id": hostId })
        .populate("host.id", "name image")
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 });

      const totalCount = await PropertyModel.countDocuments({
        "host.id": hostId,
      });

      return {
        success: true,
        message: "Host properties retrieved successfully",
        properties: properties.map((property) => property.toJSON()),
        totalCount,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving host properties: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        properties: [],
        totalCount: 0,
      };
    }
  },
};
