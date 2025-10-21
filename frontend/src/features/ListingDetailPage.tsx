"use client";

import { Footer, Header } from "@/components/navigations";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  HeroSection,
  ListingInfo,
  HostProfile,
  Amenities,
  Reviews,
  BookingCard,
  ListingDetailSkeleton,
} from "../components/listing";
import { useGetPropertyQuery } from "@/generated/graphql";

export const ListingDetailPage = () => {
  const params = useParams();
  const propertyId = params?.id as string;

  const { data, loading } = useGetPropertyQuery({
    variables: {
      getPropertyId: propertyId,
    },
    fetchPolicy: "cache-first",
  });

  const property = data?.getProperty?.property;

  if (loading) {
    return <ListingDetailSkeleton />;
  }

  if (!property) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center bg-white">
        <Header />
        <div className="max-w-[1280px] w-full flex items-center justify-center py-12 lg:py-20 px-4">
          <div className="text-center">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              Property not found
            </h1>
            <p className="text-gray-600 mb-4">
              The property you&lsquo;re looking for doesn&lsquo;t exist or has
              been removed.
            </p>
            <Link
              href="/"
              className="text-gray-900 hover:text-gray-700 transition-colors cursor-pointer"
              prefetch={true}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property.isActive) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center bg-white">
        <Header />
        <div className="max-w-[1280px] w-full flex items-center justify-center py-12 lg:py-20 px-4">
          <div className="text-center">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              Property unavailable
            </h1>
            <p className="text-gray-600 mb-4">
              This property is currently not available for viewing.
            </p>
            <Link
              href="/"
              className="text-gray-900 hover:text-gray-700 transition-colors cursor-pointer"
              prefetch={true}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <Header />

      {/* Main Content */}
      <div className="max-w-[1280px] w-full flex flex-col lg:flex-row gap-4 lg:gap-12 py-6 lg:py-12 px-4">
        <div className="w-full flex flex-col gap-6 lg:gap-8">
          {/* Hero Section */}
          <HeroSection images={property.images || []} title={property.title} />

          {/* Property Info */}
          <ListingInfo
            title={property.title}
            location={{
              city: property.location.city,
              district: property.location.district,
              address: property.location.address || "",
              lat: property.location.lat || 0,
              lng: property.location.lng || 0,
            }}
            pricePerMonth={property.pricePerMonth}
            bedrooms={property.roomCount}
            bathrooms={1}
            shared={property.shared}
            maxRoommates={property.maxRoommates || 1}
          />

          <div className="w-full h-[1px] bg-gray-300"></div>
          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              About this place
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {property.description || "No description available."}
            </p>
          </div>

          <div className="w-full h-[1px] bg-gray-300"></div>

          {/* Host Profile */}
          <HostProfile
            host={{
              id: property.host.name,
              name: property.host.name,
              photo: property.host.image || "",
              rating: 4.5,
            }}
          />

          <div className="w-full h-[1px] bg-gray-300"></div>

          {/* Amenities */}
          <Amenities amenities={property.amenities || []} />

          <div className="w-full h-[1px] bg-gray-300"></div>

          {/* Reviews */}
          <Reviews reviews={[]} />
        </div>

        <div className="w-full lg:max-w-[400px] lg:sticky lg:top-[123px] lg:self-start">
          <BookingCard
            pricePerMonth={property.pricePerMonth}
            availableFrom={property.availableFrom}
            availableTo={property.availableTo}
            propertyId={property.id}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};
