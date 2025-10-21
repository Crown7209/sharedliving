export type PropertyType = "apartment" | "house" | "studio" | "other";

export type PrivacyType = "entire_place" | "private_room" | "shared_room";

export type Property = {
  id: string;
  title: string;
  description?: string;
  host: {
    id: string;
    name: string;
    image: string;
    // rating?: number;
  };
  location: {
    city: string;
    district: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
  pricePerMonth: number;
  roomCount: number;
  shared: boolean;
  maxRoommates?: number;
  images?: string[];
  amenities?: string[];
  propertyType?: PropertyType;
  privacyType?: PrivacyType;
  availableFrom: string;
  availableTo: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// GraphQL Input Types
export type CreatePropertyInput = {
  title: string;
  description?: string;
  hostId: string;
  location: {
    city: string;
    district: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
  pricePerMonth: number;
  roomCount: number;
  shared: boolean;
  maxRoommates?: number;
  images?: string[];
  amenities?: string[];
  propertyType?: PropertyType;
  privacyType?: PrivacyType;
  availableFrom: string;
  availableTo: string;
  isActive?: boolean;
};

export type UpdatePropertyInput = {
  id: string;
  title?: string;
  description?: string;
  location?: {
    city?: string;
    district?: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
  pricePerMonth?: number;
  roomCount?: number;
  shared?: boolean;
  maxRoommates?: number;
  images?: string[];
  amenities?: string[];
  propertyType?: PropertyType;
  privacyType?: PrivacyType;
  availableFrom?: string;
  availableTo?: string;
  isActive?: boolean;
};

export type PropertySearchInput = {
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  roomCount?: number;
  shared?: boolean;
  propertyType?: PropertyType;
  privacyType?: PrivacyType;
  amenities?: string[];
  availableFrom?: string;
  availableTo?: string;
  isActive?: boolean;
  limit?: number;
  offset?: number;
};

// GraphQL Response Types
export type PropertyResponse = {
  success: boolean;
  message: string;
  property?: Property;
};

export type PropertiesResponse = {
  success: boolean;
  message: string;
  properties: Property[];
  totalCount: number;
};
