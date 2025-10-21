import { FilterOptions, SortOption } from "../components/home/types";

/**
 * Converts filter options to URL search parameters
 */
export const filtersToSearchParams = (
  filters: FilterOptions
): URLSearchParams => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return params;
};

/**
 * Converts URL search parameters to filter options
 */
export const searchParamsToFilters = (
  searchParams: URLSearchParams
): FilterOptions => {
  const filters: FilterOptions = {};

  const city = searchParams.get("city");
  if (city) filters.city = city;

  const district = searchParams.get("district");
  if (district) filters.district = district;

  const minPrice = searchParams.get("minPrice");
  if (minPrice) filters.minPrice = Number(minPrice);

  const maxPrice = searchParams.get("maxPrice");
  if (maxPrice) filters.maxPrice = Number(maxPrice);

  const minRooms = searchParams.get("minRooms");
  if (minRooms) filters.minRooms = Number(minRooms);

  const maxRooms = searchParams.get("maxRooms");
  if (maxRooms) filters.maxRooms = Number(maxRooms);

  const shared = searchParams.get("shared");
  if (shared === "true") filters.shared = true;

  const sort = searchParams.get("sort");
  if (sort && ["price-asc", "price-desc", "newest", "oldest"].includes(sort)) {
    filters.sort = sort as SortOption;
  }

  return filters;
};

/**
 * Clears all filter parameters from URL search params
 */
export const clearFilterParams = (
  searchParams: URLSearchParams
): URLSearchParams => {
  const params = new URLSearchParams(searchParams);
  const filterKeys = [
    "city",
    "district",
    "minPrice",
    "maxPrice",
    "minRooms",
    "maxRooms",
    "shared",
    "sort",
  ];

  filterKeys.forEach((key) => {
    params.delete(key);
  });

  return params;
};
