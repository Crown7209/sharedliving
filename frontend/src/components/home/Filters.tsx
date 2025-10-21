"use client";

import type { FiltersProps } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Checkbox } from "../../components/ui/checkbox";
import { PriceFilter } from "./PriceFilter";
import { Settings2 } from "lucide-react";

export const Filters = ({
  filters,
  onFiltersChange,
  availableCities,
  availableDistricts,
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

  const handleRoomSelect = (rooms: number | "3+") => {
    const currentSelected = getSelectedRoom();

    // If the same room is selected, unselect it
    if (currentSelected === rooms) {
      onFiltersChange({
        ...filters,
        minRooms: undefined,
        maxRooms: undefined,
      });
      return;
    }

    // Otherwise, select the new room
    if (rooms === "3+") {
      onFiltersChange({
        ...filters,
        minRooms: 3,
        maxRooms: undefined,
      });
    } else {
      onFiltersChange({
        ...filters,
        minRooms: rooms,
        maxRooms: rooms,
      });
    }
  };

  const getSelectedRoom = () => {
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
        defaultValue={["city", "district", "price", "rooms"]}
        className="w-full"
      >
        {/* City Filter */}
        <AccordionItem value="city" className="border-y border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 uppercase tracking-wide py-5 hover:no-underline">
            City
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

        {/* District Filter */}
        <AccordionItem value="district" className="border-b border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 uppercase tracking-wide py-5 hover:no-underline">
            District
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
                : availableDistricts.map((district) => (
                    <label
                      key={district}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={filters.district === district}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleFilterChange("district", district);
                          } else {
                            handleFilterChange("district", undefined);
                          }
                        }}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {district}
                      </span>
                    </label>
                  ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price" className="border-b border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 uppercase tracking-wide py-5 hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <PriceFilter filters={filters} onFiltersChange={onFiltersChange} />
          </AccordionContent>
        </AccordionItem>

        {/* Room Filter */}
        <AccordionItem value="rooms" className="border-b-0">
          <AccordionTrigger className="text-sm font-medium text-gray-900 uppercase tracking-wide py-5 hover:no-underline">
            Rooms
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2">
              {[1, 2, "3+"].map((room) => (
                <button
                  key={room}
                  onClick={() => handleRoomSelect(room as number | "3+")}
                  className={`flex-1 py-2 px-3 text-sm border transition-all ${
                    getSelectedRoom() === room
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <button
          onClick={clearFilters}
          className="text-xs uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          Clear All
        </button>
      </div> */}
    </div>
  );
};
