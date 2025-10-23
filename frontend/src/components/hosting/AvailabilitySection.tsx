"use client";

import { useState } from "react";
import { FormSectionProps } from "./types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

const FormSection = ({ title, children }: FormSectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    {children}
  </div>
);

interface AvailabilitySectionProps {
  availableFrom: string;
  setAvailableFrom: (value: string) => void;
  availableTo: string;
  setAvailableTo: (value: string) => void;
  errors: Record<string, string>;
}

export const AvailabilitySection = ({
  availableFrom,
  setAvailableFrom,
  availableTo,
  setAvailableTo,
  errors,
}: AvailabilitySectionProps) => {
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const fromDate = availableFrom ? new Date(availableFrom) : undefined;
  const toDate = availableTo ? new Date(availableTo) : undefined;

  return (
    <FormSection title="Availability">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Available From <span className="text-red-500">*</span>
          </label>
          <Popover open={fromOpen} onOpenChange={setFromOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-[42px] rounded-lg shadow-none justify-between font-normal border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {fromDate
                  ? fromDate.toLocaleDateString("en-GB")
                  : "Select start date"}
                <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={(date) => {
                  if (date) {
                    const isoString = date.toISOString().split("T")[0];
                    setAvailableFrom(isoString);
                  }
                  setFromOpen(false);
                }}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          {errors.availableFrom && (
            <p className="text-red-500 text-sm">{errors.availableFrom}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Available To <span className="text-red-500">*</span>
          </label>
          <Popover open={toOpen} onOpenChange={setToOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-[42px] rounded-lg shadow-none justify-between font-normal border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {toDate
                  ? toDate.toLocaleDateString("en-GB")
                  : "Select end date"}
                <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={(date) => {
                  if (date) {
                    const isoString = date.toISOString().split("T")[0];
                    setAvailableTo(isoString);
                  }
                  setToOpen(false);
                }}
                disabled={(date) =>
                  date < new Date() || (fromDate ? date < fromDate : false)
                }
              />
            </PopoverContent>
          </Popover>
          {errors.availableTo && (
            <p className="text-red-500 text-sm">{errors.availableTo}</p>
          )}
        </div>
      </div>
    </FormSection>
  );
};
