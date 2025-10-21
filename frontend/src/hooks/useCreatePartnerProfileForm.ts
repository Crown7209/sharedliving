"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  GenderPreferenceEnum,
  useCreatePartnerProfileMutation,
  useGetPartnerProfilesByUserQuery,
} from "@/generated/graphql";

export const useCreatePartnerProfileForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [preferredLocation, setPreferredLocation] = useState("");
  const [budgetMin, setBudgetMin] = useState<number | "">("");
  const [budgetMax, setBudgetMax] = useState<number | "">("");
  const [moveInDate, setMoveInDate] = useState("");
  const [stayDurationMonths, setStayDurationMonths] = useState<number | "">("");
  const [roommateCount, setRoommateCount] = useState<number | "">(1);
  const [genderPreference, setGenderPreference] =
    useState<GenderPreferenceEnum>(GenderPreferenceEnum.ANY);
  const [about, setAbout] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [createPartnerProfile] = useCreatePartnerProfileMutation();

  // Fetch existing partner profile data
  const { data: existingProfileData, refetch: refetchUserProfile } =
    useGetPartnerProfilesByUserQuery({
      variables: { userId: user?.id || "" },
      skip: !user?.id,
      fetchPolicy: "cache-and-network",
    });

  const propertyId = searchParams.get("propertyId");

  // Populate form fields with existing profile data
  useEffect(() => {
    if (
      existingProfileData?.getPartnerProfilesByUser?.profiles?.length &&
      existingProfileData.getPartnerProfilesByUser.profiles.length > 0
    ) {
      const existingProfile =
        existingProfileData.getPartnerProfilesByUser.profiles[0];

      if (existingProfile.preferredLocation) {
        setPreferredLocation(existingProfile.preferredLocation);
      }
      if (existingProfile.budgetMin) {
        setBudgetMin(existingProfile.budgetMin);
      }
      if (existingProfile.budgetMax) {
        setBudgetMax(existingProfile.budgetMax);
      }
      if (existingProfile.moveInDate) {
        setMoveInDate(existingProfile.moveInDate);
      }
      if (existingProfile.stayDurationMonths) {
        setStayDurationMonths(existingProfile.stayDurationMonths);
      }
      if (existingProfile.roommateCount) {
        setRoommateCount(existingProfile.roommateCount);
      }
      if (existingProfile.genderPreference) {
        setGenderPreference(existingProfile.genderPreference);
      }
      if (existingProfile.about) {
        setAbout(existingProfile.about);
      }
    }
  }, [existingProfileData]);

  // Check if user has an existing profile
  const hasExistingProfile =
    existingProfileData?.getPartnerProfilesByUser?.profiles?.length &&
    existingProfileData.getPartnerProfilesByUser.profiles.length > 0;

  const isFormValid = (): boolean => {
    if (!user?.id) return false;
    if (!budgetMin || !budgetMax) return false;
    if (!moveInDate) return false;
    if (!roommateCount || Number(roommateCount) < 1) return false;
    return true;
  };

  const handleCreatePartnerProfile = async (): Promise<void> => {
    try {
      setErrorMessage("");
      if (!isFormValid()) {
        setErrorMessage("Please fill in required fields");
        return;
      }
      setIsSubmitting(true);
      const { data } = await createPartnerProfile({
        variables: {
          input: {
            userId: user!.id,
            targetPropertyId: propertyId || null,
            preferredLocation: preferredLocation || undefined,
            budgetMin: budgetMin === "" ? undefined : Number(budgetMin),
            budgetMax: budgetMax === "" ? undefined : Number(budgetMax),
            moveInDate,
            stayDurationMonths:
              stayDurationMonths === ""
                ? undefined
                : Number(stayDurationMonths),
            roommateCount: Number(roommateCount),
            genderPreference,
            about: about || undefined,
            isLookingForPartner: true,
          },
        },
      });

      if (data?.createPartnerProfile?.success) {
        // Refetch user profile data to update the cache
        await refetchUserProfile();

        if (propertyId) {
          router.push(`/partners?propertyId=${encodeURIComponent(propertyId)}`);
        } else {
          router.push("/partners");
        }
      } else {
        setErrorMessage(
          data?.createPartnerProfile?.message || "Failed to create profile"
        );
      }
    } catch (error) {
      console.error("Error creating partner profile:", error);
      setErrorMessage("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // form state
    preferredLocation,
    setPreferredLocation,
    budgetMin,
    setBudgetMin,
    budgetMax,
    setBudgetMax,
    moveInDate,
    setMoveInDate,
    stayDurationMonths,
    setStayDurationMonths,
    roommateCount,
    setRoommateCount,
    genderPreference,
    setGenderPreference,
    about,
    setAbout,

    // ui state
    isSubmitting,
    errorMessage,
    isFormValid,
    hasExistingProfile,

    // actions
    handleCreatePartnerProfile,
  };
};
