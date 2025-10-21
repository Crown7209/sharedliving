"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import {
  Card,
  Filters,
  SelectedFilters,
  SortDropdown,
} from "../components/home";
import { FilterOptions, SortOption } from "../components/home/types";
import {
  searchParamsToFilters,
  filtersToSearchParams,
} from "../utils/url-params";
import { Footer, Header } from "../components/navigations";
import { useSearchPropertiesQuery } from "../generated/graphql";
import { CardSkeleton } from "../components/home/CardSkeleton";
import { Button } from "../components/ui/button";
import { Settings2, X } from "lucide-react";

export const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { data: propertiesData, loading: propertiesLoading } =
    useSearchPropertiesQuery({
      variables: {
        input: {
          isActive: true,
          limit: 100, // Get more properties for filtering
        },
      },
      fetchPolicy: "cache-first",
    });

  const properties = propertiesData?.searchProperties?.properties;

  const filters: FilterOptions = useMemo(() => {
    return searchParamsToFilters(searchParams);
  }, [searchParams]);

  // Update URL when filters change
  const updateFilters = useCallback(
    (newFilters: FilterOptions) => {
      const params = filtersToSearchParams(newFilters);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname]
  );

  // Handle sort change
  const handleSortChange = useCallback(
    (sort: SortOption) => {
      updateFilters({ ...filters, sort });
    },
    [filters, updateFilters]
  );

  // Get unique cities and districts from data
  const availableCities = useMemo(() => {
    if (!properties) return [];
    return Array.from(
      new Set(properties.map((listing) => listing.location.city))
    ).sort();
  }, [properties]);

  const availableDistricts = useMemo(() => {
    if (!properties) return [];
    return Array.from(
      new Set(properties.map((listing) => listing.location.district))
    ).sort();
  }, [properties]);

  const filteredListings = useMemo(() => {
    if (!properties) return [];

    let filtered = properties.filter((listing) => {
      // City filter
      if (filters.city && listing.location.city !== filters.city) {
        return false;
      }

      // District filter
      if (filters.district && listing.location.district !== filters.district) {
        return false;
      }

      // Price range filter
      if (filters.minPrice && listing.pricePerMonth < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && listing.pricePerMonth > filters.maxPrice) {
        return false;
      }

      // Room count filter
      if (filters.minRooms && listing.roomCount < filters.minRooms) {
        return false;
      }
      if (filters.maxRooms && listing.roomCount > filters.maxRooms) {
        return false;
      }

      // Shared filter
      if (filters.shared !== undefined && listing.shared !== filters.shared) {
        return false;
      }

      return true;
    });

    // Apply sorting
    if (filters.sort) {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sort) {
          case "price-asc":
            return a.pricePerMonth - b.pricePerMonth;
          case "price-desc":
            return b.pricePerMonth - a.pricePerMonth;
          case "newest":
            // Use updatedAt if createdAt is not available, fallback to 0 for invalid dates
            const bDate = new Date(b.createdAt || b.updatedAt || 0);
            const aDate = new Date(a.createdAt || a.updatedAt || 0);
            return bDate.getTime() - aDate.getTime();
          case "oldest":
            // Use updatedAt if createdAt is not available, fallback to 0 for invalid dates
            const aDateOldest = new Date(a.createdAt || a.updatedAt || 0);
            const bDateOldest = new Date(b.createdAt || b.updatedAt || 0);
            return aDateOldest.getTime() - bDateOldest.getTime();
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [properties, filters]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <Header />

      <div className="max-w-[1280px] w-full flex gap-4 lg:gap-12 py-6 lg:py-12 px-4 relative">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block max-w-[280px] w-full">
          <Filters
            filters={filters}
            onFiltersChange={updateFilters}
            availableCities={availableCities}
            availableDistricts={availableDistricts}
            loading={propertiesLoading}
          />
        </div>

        {/* Mobile Filters Overlay */}
        {isFiltersOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-50 animate-in fade-in-0 duration-300">
            <div className="absolute bottom-0 left-0 right-0 bg-white shadow-xl overflow-y-auto animate-in slide-in-from-bottom-4 duration-300 ease-out rounded-t-2xl max-h-[90vh]">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFiltersOpen(false)}
                  className="cursor-pointer"
                >
                  <X size={20} />
                </Button>
              </div>
              <div className="p-4">
                <Filters
                  filters={filters}
                  onFiltersChange={updateFilters}
                  availableCities={availableCities}
                  availableDistricts={availableDistricts}
                  loading={propertiesLoading}
                />
              </div>
            </div>
          </div>
        )}

        <div className="w-full flex flex-col gap-4 lg:gap-5">
          {/* Mobile Filter Toggle & Sort */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 cursor-pointer shadow-none"
            >
              <Settings2 size={16} />
              Filters
            </Button>

            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="hidden lg:block">
                <SelectedFilters
                  filters={filters}
                  onFiltersChange={updateFilters}
                />
              </div>
              <SortDropdown
                sort={filters.sort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
            {propertiesLoading
              ? Array.from({ length: 15 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              : filteredListings.map((listing) => (
                  <Card key={listing.id} listing={listing} />
                ))}
          </div>

          {!propertiesLoading && filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No listings found matching your criteria.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
