export const PartnerCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col gap-2 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-40 bg-gray-200 rounded-xl"></div>

      {/* Content skeleton */}
      <div className="flex flex-col px-2 pb-2 gap-2">
        {/* Location skeleton */}

        <div className="h-3 bg-gray-200 rounded w-16"></div>

        <div className="h-3 bg-gray-200 rounded w-20"></div>

        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
};
