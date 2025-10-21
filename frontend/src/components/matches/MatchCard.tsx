import { PartnerProfile, PartnerMatch } from "../../generated/graphql";
import { Heart, Users, MapPin, DollarSign, Calendar } from "lucide-react";
import Image from "next/image";

interface MatchCardProps {
  match: PartnerMatch;
  currentUserId: string;
  partnerProfile?: PartnerProfile;
}

export const MatchCard = ({
  match,
  // currentUserId,
  partnerProfile,
}: MatchCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // const handleStartChat = () => {
  //   // TODO: Implement chat functionality
  //   console.log(
  //     "Start chat with",
  //     match.userAId === currentUserId ? match.userBId : match.userAId
  //   );
  // };

  const formatBudget = () => {
    if (!partnerProfile) return "Budget not specified";
    if (partnerProfile.budgetMin && partnerProfile.budgetMax) {
      return `${partnerProfile.budgetMin.toLocaleString()}₮ - ${partnerProfile.budgetMax.toLocaleString()}₮`;
    } else if (partnerProfile.budgetMin) {
      return `From ${partnerProfile.budgetMin.toLocaleString()}₮`;
    } else if (partnerProfile.budgetMax) {
      return `Up to ${partnerProfile.budgetMax.toLocaleString()}₮`;
    }
    return "Budget not specified";
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col gap-2">
      {/* Image Section */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden">
        {partnerProfile?.user?.image ? (
          <Image
            src={
              partnerProfile.user?.image ||
              "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            }
            alt={partnerProfile.user.name || "User profile"}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-xs font-medium text-gray-600">
                🎉 It&apos;s a Match!
              </div>
            </div>
          </div>
        )}

        {/* Match Status Overlay */}
        <div className="absolute top-2 right-2">
          <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Match
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col px-2 pb-2">
        {/* Match Date */}
        <div className="flex items-center gap-1 mb-1">
          <Calendar className="w-3 h-3 text-gray-500" />
          <p className="font-normal text-xs text-gray-600">
            {formatDate(match.createdAt)}
          </p>
        </div>

        {/* Location */}
        {partnerProfile?.preferredLocation && (
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="w-3 h-3 text-gray-500" />
            <p className="font-normal text-xs text-gray-600 truncate">
              {partnerProfile.preferredLocation}
            </p>
          </div>
        )}

        {/* Budget */}
        {partnerProfile && (
          <div className="flex items-center gap-1 mb-1">
            <DollarSign className="w-3 h-3 text-gray-500" />
            <p className="text-gray-900 font-normal text-xs truncate">
              {formatBudget()}
            </p>
          </div>
        )}

        {/* Roommate Count */}
        {partnerProfile && (
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-gray-500" />
            <p className="text-gray-600 font-normal text-xs">
              Needs {partnerProfile.roommateCount} roommate
              {partnerProfile.roommateCount !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
