"use client";

import { FormSectionProps } from "./types";
import { PropertyType } from "@/generated/graphql";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSection = ({ title, children }: FormSectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    {children}
  </div>
);

interface PropertyTypeSectionProps {
  propertyType: PropertyType;
  setPropertyType: (value: PropertyType) => void;
  errors: Record<string, string>;
}

export const PropertyTypeSection = ({
  propertyType,
  setPropertyType,
  errors,
}: PropertyTypeSectionProps) => {
  const propertyTypeOptions = [
    { value: PropertyType.APARTMENT, label: "Apartment" },
    { value: PropertyType.HOUSE, label: "House" },
    { value: PropertyType.STUDIO, label: "Studio" },
  ];

  return (
    <FormSection title="Property Type">
      <Select
        value={propertyType}
        onValueChange={(value) => setPropertyType(value as PropertyType)}
      >
        <SelectTrigger className="w-full min-h-[42px] rounded-lg border-gray-300 focus:border-black shadow-none">
          <SelectValue placeholder="Select property type" />
        </SelectTrigger>
        <SelectContent>
          {propertyTypeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.propertyType && (
        <p className="text-red-500 text-sm">{errors.propertyType}</p>
      )}
    </FormSection>
  );
};
