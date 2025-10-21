"use client";

import { X } from "lucide-react";
import { FilterOptions } from "./types";

type SelectedFiltersProps = {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
};

export const SelectedFilters = ({
  filters,
  onFiltersChange,
}: SelectedFiltersProps) => {
  const removeFilter = (key: keyof FilterOptions) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const removeRooms = () => {
    const newFilters = { ...filters };
    delete newFilters.minRooms;
    delete newFilters.maxRooms;
    onFiltersChange(newFilters);
  };

  const filterChips: { label: string; onRemove: () => void }[] = [];

  if (filters.city) {
    filterChips.push({
      label: `${filters.city}`,
      onRemove: () => removeFilter("city"),
    });
  }

  if (filters.district) {
    filterChips.push({
      label: `${filters.district}`,
      onRemove: () => removeFilter("district"),
    });
  }

  if (filters.minPrice || filters.maxPrice) {
    filterChips.push({
      label: `${filters.minPrice ?? 0}₮ - ${filters.maxPrice ?? "∞"}₮`,
      onRemove: () => {
        const newFilters = { ...filters };
        delete newFilters.minPrice;
        delete newFilters.maxPrice;
        onFiltersChange(newFilters);
      },
    });
  }

  if (filters.minRooms || filters.maxRooms) {
    filterChips.push({
      label:
        filters.minRooms === filters.maxRooms
          ? `${filters.minRooms} room`
          : `${filters.minRooms ?? ""} + rooms`,
      onRemove: removeRooms,
    });
  }

  if (filters.shared !== undefined) {
    filterChips.push({
      label: filters.shared ? "Shared" : "Private",
      onRemove: () => removeFilter("shared"),
    });
  }

  if (filterChips.length === 0) return <div></div>;

  return (
    <div className="flex flex-wrap gap-2">
      {filterChips.map((chip, idx) => (
        <span
          key={idx}
          className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={14} />
          </button>
        </span>
      ))}
    </div>
  );
};
