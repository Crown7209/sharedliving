import { PartnerProfile, InterestStatusEnum } from "../../generated/graphql";
import { Heart, Users, MapPin, DollarSign, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface PartnerCardProps {
  profile: PartnerProfile;
  onInterest?: (
    profile: PartnerProfile,
    status: "INTERESTED" | "SKIPPED"
  ) => void;
  currentUserId?: string;
  isProcessing?: boolean;
  existingInterestStatus?: InterestStatusEnum | null;
}

export const PartnerCard = ({
  profile,
  onInterest,
  currentUserId,
  isProcessing = false,
  existingInterestStatus,
}: PartnerCardProps) => {
  const [isInterested, setIsInterested] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  // Initialize state from existing interest status
  useEffect(() => {
    if (existingInterestStatus === InterestStatusEnum.INTERESTED) {
      setIsInterested(true);
      setIsSkipped(false);
    } else if (existingInterestStatus === InterestStatusEnum.SKIPPED) {
      setIsSkipped(true);
      setIsInterested(false);
    } else {
      setIsInterested(false);
      setIsSkipped(false);
    }
  }, [existingInterestStatus]);

  const handleInterest = (status: "INTERESTED" | "SKIPPED") => {
    if (isProcessing) return;

    if (status === "INTERESTED") {
      setIsInterested(true);
      setIsSkipped(false);
    } else {
      setIsSkipped(true);
      setIsInterested(false);
    }

    onInterest?.(profile, status);
  };

  const isOwnProfile = currentUserId === profile.userId;

  const formatBudget = () => {
    if (profile.budgetMin && profile.budgetMax) {
      return `${profile.budgetMin.toLocaleString()}₮ - ${profile.budgetMax.toLocaleString()}₮`;
    } else if (profile.budgetMin) {
      return `From ${profile.budgetMin.toLocaleString()}₮`;
    } else if (profile.budgetMax) {
      return `Up to ${profile.budgetMax.toLocaleString()}₮`;
    }
    return "Budget not specified";
  };

  return (
    <div
      //   href={`/partners/${profile.id}`}
      className="group bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col gap-2"
    >
      {/* Image Section */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden">
        <Image
          src={
            profile.user?.image ||
            "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          }
          alt={profile.user?.name || "User"}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Buttons */}
        {!isOwnProfile && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
            {/* Skip */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleInterest("SKIPPED");
              }}
              disabled={isProcessing || isSkipped}
              className={`flex items-center justify-center gap-1 p-2 rounded-full text-xs font-medium transition-colors bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 cursor-pointer  `}
            >
              <X
                size={16}
                fill={isSkipped ? "currentColor" : "none"}
                className={isSkipped ? "fill-current" : ""}
              />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleInterest("INTERESTED");
              }}
              disabled={isProcessing || isInterested}
              className={`flex items-center justify-center p-2 rounded-full text-xs font-medium transition-colors text-white bg-red-600 border border-gray-200 hover:bg-red-700 cursor-pointer`}
            >
              <Heart
                size={16}
                fill={isInterested ? "currentColor" : "none"}
                className={isInterested ? "fill-current" : ""}
              />
            </button>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-col px-2 pb-2">
        {profile.preferredLocation && (
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="w-3 h-3 text-gray-500" />
            <p className="font-normal text-xs text-gray-600 truncate">
              {profile.preferredLocation}
            </p>
          </div>
        )}

        <div className="flex items-center gap-1 mb-1">
          <DollarSign className="w-3 h-3 text-gray-500" />
          <p className="text-gray-900 font-normal text-xs truncate">
            {formatBudget()}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-gray-500" />
          <p className="text-gray-600 font-normal text-xs">
            Needs {profile.roommateCount} roommate
            {profile.roommateCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
