"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useUpdatePropertyMutation,
  PropertyType,
  UpdatePropertyInput,
} from "@/generated/graphql";
import {
  BasicInfoSection,
  LocationSection,
  AvailabilitySection,
  PropertyTypeSection,
  AmenitiesSection,
  ImagesSection,
  ActionButtons,
  PropertyEditFormProps,
} from "./";

export const PropertyEditForm = ({
  property,
  onSuccess,
}: PropertyEditFormProps) => {
  // Form state
  const [title, setTitle] = useState(property.title || "");
  const [description, setDescription] = useState(property.description || "");
  const [pricePerMonth, setPricePerMonth] = useState<string | number>(
    property.pricePerMonth || 0
  );
  const [roomCount, setRoomCount] = useState<string | number>(
    property.roomCount || 1
  );
  const [shared, setShared] = useState(property.shared || false);
  const [maxRoommates, setMaxRoommates] = useState<string | number>(
    property.maxRoommates || 1
  );
  const [city, setCity] = useState(property.location.city || "");
  const [district, setDistrict] = useState(property.location.district || "");
  const [address, setAddress] = useState(property.location.address || "");
  const [amenities, setAmenities] = useState<string[]>(
    property.amenities && property.amenities.length > 0
      ? property.amenities
      : [""]
  );
  const [images, setImages] = useState<string[]>(
    property.images && property.images.length > 0 ? property.images : [""]
  );
  const [availableFrom, setAvailableFrom] = useState(
    property.availableFrom || ""
  );
  const [availableTo, setAvailableTo] = useState(property.availableTo || "");
  const [propertyType, setPropertyType] = useState(
    property.propertyType || PropertyType.APARTMENT
  );
  const [isActive] = useState(property.isActive || false);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // GraphQL mutation
  const [updateProperty] = useUpdatePropertyMutation();
  const router = useRouter();

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (typeof pricePerMonth === "string" || pricePerMonth <= 0)
      newErrors.pricePerMonth = "Price must be greater than 0";
    if (typeof roomCount === "string" || roomCount <= 0)
      newErrors.roomCount = "Room count must be greater than 0";
    if (!city.trim()) newErrors.city = "City is required";
    if (!district.trim()) newErrors.district = "District is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!availableFrom)
      newErrors.availableFrom = "Available from date is required";
    if (!availableTo) newErrors.availableTo = "Available to date is required";
    if (
      shared &&
      (typeof maxRoommates === "string" || !maxRoommates || maxRoommates <= 0)
    ) {
      newErrors.maxRoommates =
        "Max roommates must be greater than 0 for shared properties";
    }

    // Validate amenities - at least 1 non-empty amenity required
    const nonEmptyAmenities = amenities.filter(
      (amenity) => amenity.trim() !== ""
    );
    if (nonEmptyAmenities.length === 0) {
      newErrors.amenities = "At least one amenity is required";
    }

    // Validate images - at least 1 non-empty image required
    const nonEmptyImages = images.filter((image) => image.trim() !== "");
    if (nonEmptyImages.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (publish: boolean = false) => {
    setIsSubmitted(true);

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const input: UpdatePropertyInput = {
        id: property.id,
        title: title.trim(),
        description: description.trim(),
        pricePerMonth: typeof pricePerMonth === "string" ? 0 : pricePerMonth,
        roomCount: typeof roomCount === "string" ? 1 : roomCount,
        shared,
        maxRoommates: shared
          ? typeof maxRoommates === "string"
            ? 1
            : maxRoommates
          : undefined,
        location: {
          city: city.trim(),
          district: district.trim(),
          address: address.trim(),
          lat: property.location.lat,
          lng: property.location.lng,
        },
        amenities:
          amenities.filter((amenity) => amenity.trim() !== "").length > 0
            ? amenities.filter((amenity) => amenity.trim() !== "")
            : undefined,
        images:
          images.filter((image) => image.trim() !== "").length > 0
            ? images.filter((image) => image.trim() !== "")
            : undefined,
        availableFrom,
        availableTo,
        propertyType,
        isActive: publish ? true : isActive,
      };

      const result = await updateProperty({
        variables: { input },
      });

      if (result.data?.updateProperty?.success) {
        toast.success(
          publish
            ? "Property published successfully!"
            : "Property updated successfully!"
        );

        if (publish) {
          // Redirect to home page after successful publish
          router.push("/");
        } else {
          // Just call onSuccess for regular updates
          onSuccess?.();
        }
      } else {
        toast.error(
          result.data?.updateProperty?.message || "Failed to update property"
        );
      }
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Failed to update property");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <div className="max-w-[480px] w-full py-12 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Property Details
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Update your property information to attract more potential tenants.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
          <BasicInfoSection
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            pricePerMonth={pricePerMonth}
            setPricePerMonth={setPricePerMonth}
            roomCount={roomCount}
            setRoomCount={setRoomCount}
            shared={shared}
            setShared={setShared}
            maxRoommates={maxRoommates}
            setMaxRoommates={setMaxRoommates}
            errors={errors}
          />

          <LocationSection
            city={city}
            setCity={setCity}
            district={district}
            setDistrict={setDistrict}
            address={address}
            setAddress={setAddress}
            errors={errors}
          />

          <AvailabilitySection
            availableFrom={availableFrom}
            setAvailableFrom={setAvailableFrom}
            availableTo={availableTo}
            setAvailableTo={setAvailableTo}
            errors={errors}
          />

          <PropertyTypeSection
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            errors={errors}
          />

          <AmenitiesSection
            amenities={amenities}
            setAmenities={setAmenities}
            errors={errors}
          />

          <ImagesSection
            images={images}
            setImages={setImages}
            errors={errors}
            isSubmitted={isSubmitted}
          />

          <ActionButtons
            isSubmitting={isSubmitting}
            onSave={() => handleSubmit(false)}
            onPublish={() => handleSubmit(true)}
          />
        </div>
      </div>
    </div>
  );
};
