"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SortOption } from "./types";

type SortDropdownProps = {
  sort?: SortOption;
  onSortChange: (sort: SortOption) => void;
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

export const SortDropdown = ({ sort, onSortChange }: SortDropdownProps) => {
  return (
    <Select value={sort} onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px] shadow-none">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
