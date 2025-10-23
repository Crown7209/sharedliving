import { PropertyType } from "@/generated/graphql";

export interface PropertyFormData {
  id: string;
  title: string;
  description?: string | null;
  pricePerMonth: number;
  roomCount: number;
  shared: boolean;
  maxRoommates?: number | null;
  images?: string[] | null;
  amenities?: string[] | null;
  propertyType?: PropertyType | null;
  availableFrom: string;
  availableTo: string;
  isActive: boolean;
  location: {
    city: string;
    district: string;
    address?: string | null;
    lat?: number | null;
    lng?: number | null;
  };
}

export interface PropertyEditFormProps {
  property: PropertyFormData;
  onSuccess?: () => void;
}

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "text" | "number" | "date" | "url";
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
}

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}

export interface DynamicListProps {
  items: string[];
  onAdd: () => void;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
  addButtonText: string;
  title: string;
}

export interface AddImageProps {
  image: string;
  setImage: (image: string) => void;
  isSubmitted?: boolean;
}
