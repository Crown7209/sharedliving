import { Property } from "../../generated/graphql";

export type CardProps = {
  listing: Property;
  onClick?: (listing: Property) => void;
};

export type SortOption = "price-asc" | "price-desc" | "newest" | "oldest";

export type FilterOptions = {
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  maxRooms?: number;
  shared?: boolean;
  sort?: SortOption;
};

export type FiltersProps = {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableCities: string[];
  availableDistricts: string[];
  loading: boolean;
};
