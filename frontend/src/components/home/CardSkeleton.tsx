export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col gap-2 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-40 bg-gray-200 rounded-xl"></div>

      {/* Content skeleton */}
      <div className="flex flex-col px-1 gap-2">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

        {/* Price skeleton */}

        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
};
