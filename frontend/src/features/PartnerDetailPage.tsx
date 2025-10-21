"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  X,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Clock,
  User,
  MessageCircle,
  Share2,
  Phone,
  Mail,
  Briefcase,
} from "lucide-react";
import { Header, Footer } from "@/components/navigations";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import {
  useGetPartnerProfileQuery,
  useCreatePartnerInterestMutation,
  useGetPartnerInterestsByUserQuery,
  useGetPartnerProfilesByUserQuery,
  InterestStatusEnum,
} from "@/generated/graphql";
import { toast } from "sonner";
import Image from "next/image";

export const PartnerDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [isProcessing, setIsProcessing] = useState(false);

  const partnerId = params.id as string;

  const { data, loading, error } = useGetPartnerProfileQuery({
    variables: { id: partnerId },
    skip: !partnerId,
  });

  // Fetch existing interests for the current user
  const { data: interestsData } = useGetPartnerInterestsByUserQuery({
    variables: { userId: user?.id || "" },
    skip: !user?.id,
    fetchPolicy: "cache-first",
  });

  // Check if current user has a partner profile
  const { data: userProfileData } = useGetPartnerProfilesByUserQuery({
    variables: { userId: user?.id || "" },
    skip: !user?.id,
    fetchPolicy: "cache-first",
  });

  const [createPartnerInterestMutation] = useCreatePartnerInterestMutation();

  const profile = data?.getPartnerProfile?.profile;

  // Check if user has already expressed interest in this profile
  const existingInterestStatus =
    interestsData?.getPartnerInterestsByUser?.interests?.find(
      (interest) => interest.targetUserId === profile?.userId
    )?.status;

  const isInterested = existingInterestStatus === InterestStatusEnum.INTERESTED;
  const isSkipped = existingInterestStatus === InterestStatusEnum.SKIPPED;

  const handleBack = () => {
    router.back();
  };

  const handleInterest = async (status: "INTERESTED" | "SKIPPED") => {
    if (!user?.id || !profile) {
      toast.error("Please log in to express interest");
      return;
    }

    if (user.id === profile.userId) {
      toast.error("You cannot express interest in your own profile");
      return;
    }

    // Check if user has created a partner profile
    const userHasProfile =
      userProfileData?.getPartnerProfilesByUser?.profiles?.length &&
      userProfileData.getPartnerProfilesByUser.profiles.length > 0;
    if (!userHasProfile) {
      toast.error("Please create your partner profile first");
      router.push("/partner-profile");
      return;
    }

    setIsProcessing(true);

    try {
      const { data: result } = await createPartnerInterestMutation({
        variables: {
          input: {
            userId: user.id,
            targetUserId: profile.userId,
            status: status as InterestStatusEnum,
          },
        },
      });

      if (result?.createPartnerInterest?.success) {
        if (status === "INTERESTED") {
          if (
            result.createPartnerInterest.matchCreated &&
            result.createPartnerInterest.match
          ) {
            addNotification({
              id: result.createPartnerInterest.match.id,
              userId: user.id,
              matchedUserId: profile.userId,
              matchedUserName: profile.userId,
              createdAt: result.createPartnerInterest.match.createdAt,
            });

            toast.success(
              "🎉 It's a match! You both are interested in each other!"
            );
          } else {
            toast.success(
              "Interest expressed! You'll be notified if they're interested too."
            );
          }
        } else {
          toast.success("Profile skipped");
        }
      } else {
        toast.error(
          result?.createPartnerInterest?.message || "Failed to express interest"
        );
      }
    } catch (error: unknown) {
      console.error("Error expressing interest:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatBudget = () => {
    if (!profile) return "Budget not specified";

    if (profile.budgetMin && profile.budgetMax) {
      return `${profile.budgetMin.toLocaleString()}₮ - ${profile.budgetMax.toLocaleString()}₮`;
    } else if (profile.budgetMin) {
      return `From ${profile.budgetMin.toLocaleString()}₮`;
    } else if (profile.budgetMax) {
      return `Up to ${profile.budgetMax.toLocaleString()}₮`;
    }
    return "Budget not specified";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center bg-white">
        <Header />
        <div className="max-w-[480px] w-full px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-96 bg-gray-200"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center bg-white">
        <Header />
        <div className="max-w-[480px] w-full px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg mb-2">
              Error loading partner profile
            </p>
            <p className="text-gray-500 text-sm">
              {error?.message || "Profile not found"}
            </p>
            <button
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isOwnProfile = user?.id === profile.userId;

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50">
      <Header />

      <div className="max-w-[480px] w-full px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Image Section */}
          <div className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                {profile.user?.image ? (
                  <Image
                    src={profile.user.image}
                    alt={profile.user.name}
                    className="w-24 h-24 rounded-full object-cover"
                    fill
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-600" />
                )}
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-800">
                  {profile.user?.name || "Looking for Roommate"}
                </div>
                <div className="text-sm text-gray-600">
                  {profile.user?.age && profile.user?.gender
                    ? `${profile.user.age} years old • ${profile.user.gender}`
                    : profile.preferredLocation || "Location not specified"}
                </div>
                {profile.user?.bio && profile.user.bio.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    {profile.user.bio.join(" • ")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-6">
            {/* About Section */}
            {profile.about && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  About
                </h3>
                <p className="text-gray-600 leading-relaxed">{profile.about}</p>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-4">
              {/* Location */}
              {profile.preferredLocation && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Preferred Location
                    </div>
                    <div className="text-sm text-gray-600">
                      {profile.preferredLocation}
                    </div>
                  </div>
                </div>
              )}

              {/* Budget */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Budget Range
                  </div>
                  <div className="text-sm text-gray-600">{formatBudget()}</div>
                </div>
              </div>

              {/* Roommate Count */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Looking for
                  </div>
                  <div className="text-sm text-gray-600">
                    {profile.roommateCount} roommate
                    {profile.roommateCount !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Move-in Date */}
              {profile.moveInDate && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Move-in Date
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(profile.moveInDate)}
                    </div>
                  </div>
                </div>
              )}

              {/* Stay Duration */}
              {profile.stayDurationMonths && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Stay Duration
                    </div>
                    <div className="text-sm text-gray-600">
                      {profile.stayDurationMonths} month
                      {profile.stayDurationMonths !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              )}

              {/* Gender Preference */}
              {profile.genderPreference && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Gender Preference
                    </div>
                    <div className="text-sm text-gray-600">
                      {profile.genderPreference}
                    </div>
                  </div>
                </div>
              )}

              {/* Lifestyle */}
              {profile.lifestyle && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Lifestyle
                    </div>
                    <div className="text-sm text-gray-600">
                      {profile.lifestyle}
                    </div>
                  </div>
                </div>
              )}

              {/* User Contact Information */}
              {profile.user && (
                <>
                  {/* Phone */}
                  {profile.user.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          Phone
                        </div>
                        <div className="text-sm text-gray-600">
                          {profile.user.phone}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {profile.user.email && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          Email
                        </div>
                        <div className="text-sm text-gray-600">
                          {profile.user.email}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Role */}
                  {profile.user.role && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          Role
                        </div>
                        <div className="text-sm text-gray-600 capitalize">
                          {profile.user.role}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {!isOwnProfile && (
            <div className="p-6 pt-0">
              <div className="flex gap-3">
                <button
                  onClick={() => handleInterest("SKIPPED")}
                  disabled={isProcessing || isInterested}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <X className="w-5 h-5" />
                  Skip
                </button>

                <button
                  onClick={() => handleInterest("INTERESTED")}
                  disabled={isProcessing || isSkipped}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                    isInterested
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={isInterested ? "currentColor" : "none"}
                  />
                  {isInterested ? "Interested" : "Interested"}
                </button>
              </div>
            </div>
          )}

          {/* Share Button */}
          <div className="px-6 pb-6">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share Profile</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
