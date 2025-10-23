"use client";

import { FormSectionProps, InputFieldProps } from "./types";

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

const FormSection = ({ title, children }: FormSectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    {children}
  </div>
);

interface LocationSectionProps {
  city: string;
  setCity: (value: string) => void;
  district: string;
  setDistrict: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  errors: Record<string, string>;
}

export const LocationSection = ({
  city,
  setCity,
  district,
  setDistrict,
  address,
  setAddress,
  errors,
}: LocationSectionProps) => {
  return (
    <FormSection title="Location">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="City"
          value={city}
          onChange={(value) => setCity(value as string)}
          placeholder="Enter city"
          required
          error={errors.city}
        />

        <InputField
          label="District"
          value={district}
          onChange={(value) => setDistrict(value as string)}
          placeholder="Enter district"
          required
          error={errors.district}
        />
      </div>

      <InputField
        label="Address"
        value={address}
        onChange={(value) => setAddress(value as string)}
        placeholder="Enter full address"
        required
        error={errors.address}
      />
    </FormSection>
  );
};
