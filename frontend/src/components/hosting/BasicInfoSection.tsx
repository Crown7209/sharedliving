"use client";

import { FormSectionProps, InputFieldProps, TextAreaFieldProps } from "./types";
import { Checkbox } from "../ui/checkbox";

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  max,
  required = false,
  error,
  className = "",
}: InputFieldProps) => (
  <div className="flex flex-col gap-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => {
        if (type === "number") {
          const inputValue = e.target.value;
          // Allow empty string for better UX when user is typing
          if (inputValue === "") {
            onChange("");
          } else {
            const numValue = Number(inputValue);
            // Only update if it's a valid number
            if (!isNaN(numValue)) {
              onChange(numValue);
            }
          }
        } else {
          onChange(e.target.value);
        }
      }}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-all duration-200 ${className} ${
        error ? "border-red-500" : ""
      }`}
      placeholder={placeholder}
      min={min}
      max={max}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const TextAreaField = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  error,
}: TextAreaFieldProps) => (
  <div className="flex flex-col gap-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-all duration-200 ${
        error ? "border-red-500" : ""
      }`}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const FormSection = ({ title, children }: FormSectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    {children}
  </div>
);

interface BasicInfoSectionProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  pricePerMonth: string | number;
  setPricePerMonth: (value: string | number) => void;
  roomCount: string | number;
  setRoomCount: (value: string | number) => void;
  shared: boolean;
  setShared: (value: boolean) => void;
  maxRoommates: string | number;
  setMaxRoommates: (value: string | number) => void;
  errors: Record<string, string>;
}

export const BasicInfoSection = ({
  title,
  setTitle,
  description,
  setDescription,
  pricePerMonth,
  setPricePerMonth,
  roomCount,
  setRoomCount,
  shared,
  setShared,
  maxRoommates,
  setMaxRoommates,
  errors,
}: BasicInfoSectionProps) => {
  return (
    <FormSection title="Basic Information">
      <InputField
        label="Title"
        value={title}
        onChange={(value) => setTitle(value as string)}
        placeholder="Enter property title"
        required
        error={errors.title}
      />

      <TextAreaField
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Describe your property"
        rows={4}
        required
        error={errors.description}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Price per Month (₮)"
          value={pricePerMonth}
          onChange={setPricePerMonth}
          type="number"
          placeholder="0"
          min={0}
          required
          error={errors.pricePerMonth}
        />

        <InputField
          label="Room Count"
          value={roomCount}
          onChange={setRoomCount}
          type="number"
          placeholder="1"
          min={1}
          required
          error={errors.roomCount}
        />
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox
          id="shared-property"
          checked={shared}
          onCheckedChange={setShared}
          className="h-4 w-4 shadow-none"
        />

        <label
          htmlFor="shared-property"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Shared Property
        </label>
      </div>

      {shared && (
        <InputField
          label="Max Roommates"
          value={maxRoommates}
          onChange={setMaxRoommates}
          type="number"
          placeholder="1"
          min={1}
          required
          error={errors.maxRoommates}
        />
      )}
    </FormSection>
  );
};
