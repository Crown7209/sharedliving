import { Header } from "@/components/navigations";

export const ListingDetailSkeleton = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      {/* Header skeleton */}
      <Header />

      {/* Main Content */}
      <div className="max-w-[1280px] w-full flex flex-col lg:flex-row gap-4 lg:gap-12 py-6 lg:py-12 px-4">
        <div className="w-full flex flex-col gap-6 lg:gap-8">
          {/* Hero Section Skeleton */}
          <div className="w-full space-y-4">
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-16 h-12 bg-gray-200 rounded-md animate-pulse flex-shrink-0"
                ></div>
              ))}
            </div>
          </div>

          {/* Property Info Skeleton */}
          <div className="space-y-4 lg:space-y-6">
            <div className="space-y-2">
              <div className="h-6 lg:h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
            <div className="flex flex-wrap items-center gap-4 lg:gap-6">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="h-6 lg:h-8 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300"></div>

          {/* Description Skeleton */}
          <div className="space-y-4">
            <div className="h-5 lg:h-6 bg-gray-200 rounded animate-pulse w-40"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300"></div>

          {/* Host Profile Skeleton */}
          <div className="space-y-4">
            <div className="h-5 lg:h-6 bg-gray-200 rounded animate-pulse w-32"></div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300"></div>

          {/* Amenities Skeleton */}
          <div className="space-y-4">
            <div className="h-5 lg:h-6 bg-gray-200 rounded animate-pulse w-28"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300"></div>

          {/* Reviews Skeleton */}
          <div className="space-y-4">
            <div className="h-5 lg:h-6 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card Skeleton */}
        <div className="w-full lg:max-w-[400px] lg:sticky lg:top-[123px] lg:self-start">
          <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 space-y-4 lg:space-y-6">
            {/* Price Skeleton */}
            <div className="flex items-baseline gap-2">
              <div className="h-6 lg:h-8 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            </div>

            {/* Availability Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
            </div>

            {/* Form Skeleton */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
              </div>
            </div>

            {/* Additional Info Skeleton */}
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="w-full h-16 bg-gray-200 animate-pulse"></div>
    </div>
  );
};
