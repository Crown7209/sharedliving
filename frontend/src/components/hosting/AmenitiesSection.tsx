"use client";

import { Button } from "@/components/ui/button";
import { FormSectionProps, DynamicListProps } from "./types";
import { Trash2, Plus } from "lucide-react";

const FormSection = ({ title, children }: FormSectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    {children}
  </div>
);

const DynamicList = ({
  items,
  onAdd,
  onUpdate,
  onRemove,
  placeholder,
  addButtonText,
}: DynamicListProps) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        // Check if removing this item would leave no non-empty items
        const wouldLeaveNonEmptyItems = items
          .filter((_, i) => i !== index)
          .some((item) => item.trim() !== "");

        const canRemove = items.length > 1 && wouldLeaveNonEmptyItems;

        return (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-all duration-200"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              disabled={!canRemove}
              className={`h-[42px] p-3 border border-gray-300 rounded-lg focus:border-black outline-none transition-all duration-200 ${
                !canRemove ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        onClick={onAdd}
        className="cursor-pointer w-full border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
      >
        <Plus size={16} className="mr-2" />
        {addButtonText}
      </Button>
    </div>
  );
};

interface AmenitiesSectionProps {
  amenities: string[];
  setAmenities: (amenities: string[]) => void;
  errors: Record<string, string>;
}

export const AmenitiesSection = ({
  amenities,
  setAmenities,
  errors,
}: AmenitiesSectionProps) => {
  const addAmenity = () => {
    setAmenities([...amenities, ""]);
  };

  const updateAmenity = (index: number, value: string) => {
    const newAmenities = [...amenities];
    newAmenities[index] = value;
    setAmenities(newAmenities);
  };

  const removeAmenity = (index: number) => {
    // Prevent removing the last amenity
    if (amenities.length <= 1) {
      return;
    }

    // Check if removing this amenity would leave no non-empty amenities
    const wouldLeaveNonEmptyAmenities = amenities
      .filter((_, i) => i !== index)
      .some((amenity) => amenity.trim() !== "");

    if (!wouldLeaveNonEmptyAmenities) {
      return;
    }

    setAmenities(amenities.filter((_, i) => i !== index));
  };

  return (
    <FormSection title="Amenities">
      <DynamicList
        items={amenities}
        onAdd={addAmenity}
        onUpdate={updateAmenity}
        onRemove={removeAmenity}
        placeholder="Enter amenity (e.g., WiFi, Parking, Gym)"
        addButtonText="Add Amenity"
        title="Amenities"
      />
      {errors.amenities && (
        <p className="text-red-500 text-sm">{errors.amenities}</p>
      )}
    </FormSection>
  );
};
