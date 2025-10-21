"use client";

import * as Slider from "@radix-ui/react-slider";

export const PriceFilter = ({
  filters,
  onFiltersChange,
}: {
  filters: { minPrice?: number; maxPrice?: number };
  onFiltersChange: (filters: { minPrice?: number; maxPrice?: number }) => void;
}) => {
  const min = 0;
  const max = 3000000;
  const step = 50000;

  const value: [number, number] = [
    filters.minPrice ?? min,
    filters.maxPrice ?? max,
  ];

  const handleChange = (val: number[]) => {
    onFiltersChange({
      ...filters,
      minPrice: val[0],
      maxPrice: val[1],
    });
  };

  return (
    <div className="flex flex-col gap-3 pb-4">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleChange}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-gray-900 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-white border border-gray-400 rounded-full shadow hover:bg-gray-100 focus:outline-none" />
        <Slider.Thumb className="block w-4 h-4 bg-white border border-gray-400 rounded-full shadow hover:bg-gray-100 focus:outline-none" />
      </Slider.Root>

      <div className="flex justify-between text-xs text-gray-700">
        <span>{value[0].toLocaleString()}₮</span>
        <span>{value[1].toLocaleString()}₮</span>
      </div>
    </div>
  );
};
