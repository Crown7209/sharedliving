"use client";

import type { FiltersProps } from "../home/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Checkbox } from "../../components/ui/checkbox";
import { PriceFilter } from "../home/PriceFilter";
import { Settings2 } from "lucide-react";

export const PartnerFilters = ({
  filters,
  onFiltersChange,
  availableCities,
  loading,
}: FiltersProps) => {
  const handleFilterChange = (
    key: keyof typeof filters,
    value: string | number | boolean | undefined
  ) => {
    // If the same value is selected, unselect it
    if (filters[key] === value) {
      onFiltersChange({
        ...filters,
        [key]: undefined,
      });
    } else {
      onFiltersChange({
        ...filters,
        [key]: value,
      });
    }
  };

  // const clearFilters = () => {
  //   onFiltersChange({});
  // };

  const handleRoommateSelect = (roommates: number | "3+") => {
    const currentSelected = getSelectedRoommates();

    // If the same roommate count is selected, unselect it
    if (currentSelected === roommates) {
      onFiltersChange({
        ...filters,
        minRooms: undefined,
        maxRooms: undefined,
      });
      return;
    }

    // Otherwise, select the new roommate count
    if (roommates === "3+") {
      onFiltersChange({
        ...filters,
        minRooms: 3,
        maxRooms: undefined,
      });
    } else {
      onFiltersChange({
        ...filters,
        minRooms: roommates,
        maxRooms: roommates,
      });
    }
  };

  const getSelectedRoommates = () => {
    if (filters.minRooms === 3 && !filters.maxRooms) return "3+";
    if (filters.minRooms === filters.maxRooms) return filters.minRooms;
    return null;
  };

  return (
    <div className="w-full lg:max-w-[280px] flex flex-col gap-5 lg:sticky lg:top-[123px] lg:z-20 lg:self-start">
      <div className="flex items-center gap-2">
        <Settings2 size={20} />
        <p className="text-lg font-normal text-gray-900">Filters</p>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["location", "budget", "roommates"]}
        className="w-full"
      >
        {/* Location Filter */}
        <AccordionItem value="location" className="border-y border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 uppercase tracking-wide py-5 hover:no-underline">
            Location
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 pb-4">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3 h-5">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                  ))
                : availableCities.map((city) => (
                    <label
                      key={city}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={filters.city === city}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleFilterChange("city", city);
                          } else {
                            handleFilterChange("city", undefined);
                          }
                        }}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {city}
                      </span>
                    </label>
                  ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Budget Filter */}
        <AccordionItem value="budget" className="border-b border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 uppercase tracking-wide py-5 hover:no-underline">
            Budget
          </AccordionTrigger>
          <AccordionContent>
            <PriceFilter filters={filters} onFiltersChange={onFiltersChange} />
          </AccordionContent>
        </AccordionItem>

        {/* Roommate Count Filter */}
        <AccordionItem value="roommates" className="border-b-0">
          <AccordionTrigger className="text-sm font-medium text-gray-900 uppercase tracking-wide py-5 hover:no-underline">
            Roommates Needed
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2">
              {[1, 2, "3+"].map((roommate) => (
                <button
                  key={roommate}
                  onClick={() =>
                    handleRoommateSelect(roommate as number | "3+")
                  }
                  className={`flex-1 py-2 px-3 text-sm border transition-all ${
                    getSelectedRoommates() === roommate
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {roommate}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
