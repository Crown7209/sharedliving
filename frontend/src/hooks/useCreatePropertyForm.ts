"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PropertyType, useCreatePropertyMutation } from "@/generated/graphql";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export const useCreatePropertyForm = () => {
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerMonth, setPricePerMonth] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [shared, setShared] = useState<boolean>(false);
  const [maxRoommates, setMaxRoommates] = useState<number>(1);
  const [city, setCity] = useState("Ulaanbaatar");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [propertyType, setPropertyType] = useState("APARTMENT");
  const [isActive, setIsActive] = useState(false);

  // UI state
  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // GraphQL mutation
  const [createProperty] = useCreatePropertyMutation();
  const { user } = useAuth();
  const router = useRouter();

  const clearAllFields = () => {
    setTitle("");
    setDescription("");
    setPricePerMonth(0);
    setBedrooms(1);
    setBathrooms(1);
    setShared(false);
    setMaxRoommates(1);
    setCity("Ulaanbaatar");
    setDistrict("");
    setAddress("");
    setAmenities([]);
    setImages([]);
    setAvailableFrom("");
    setAvailableTo("");
    setPropertyType("APARTMENT");
    setIsActive(false);
    setCurrentStep(0);
    setShowForm(false);
    setIsSubmitted(false);
  };

  const isFormValid = () => {
    if (!title || !description || !district || !address || pricePerMonth <= 0) {
      toast.error("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const handleCreateProperty = async () => {
    setIsSubmitted(true);

    // if (!isFormValid()) return;

    setIsSubmitLoading(true);

    try {
      const result = await createProperty({
        variables: {
          input: {
            title: "-/-",
            description: "-/-",
            pricePerMonth: 1,
            roomCount: 1,
            shared: false,
            maxRoommates: 1,
            location: {
              city: "-/-",
              district: "-/-",
              address: "-/-",
            },
            amenities: ["-/-"],
            images: ["-/-"],
            availableFrom: "-/-",
            availableTo: "-/-",
            propertyType: PropertyType.APARTMENT,
            hostId: user?.id || "",
            isActive: false,
          },
        },
      });

      const createdProperty = result.data?.createProperty?.property;

      if (createdProperty?.id) {
        toast.success("Property created successfully!");
        console.log("✅ Property created:", createdProperty.id);

        router.push(`/hosting/${createdProperty.id}/about-your-place`);
      } else {
        toast.error("Failed to get property ID");
      }

      setIsSubmitted(false);
    } catch (error) {
      console.error("Error creating property:", error);
      toast.error("Failed to create property");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return {
    // Form fields
    title,
    setTitle,
    description,
    setDescription,
    pricePerMonth,
    setPricePerMonth,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    shared,
    setShared,
    maxRoommates,
    setMaxRoommates,
    city,
    setCity,
    district,
    setDistrict,
    address,
    setAddress,
    amenities,
    setAmenities,
    images,
    setImages,
    availableFrom,
    setAvailableFrom,
    availableTo,
    setAvailableTo,
    propertyType,
    setPropertyType,
    isActive,
    setIsActive,
    // UI state
    currentStep,
    setCurrentStep,
    showForm,
    setShowForm,
    isSubmitLoading,
    setIsSubmitLoading,
    isSubmitted,
    setIsSubmitted,

    // Actions
    clearAllFields,
    isFormValid,
    handleCreateProperty,
  };
};
