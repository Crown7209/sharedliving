import { PartnerProfile } from "../../generated/graphql";
import { Heart, Users, MapPin, DollarSign } from "lucide-react";
import Image from "next/image";

interface InterestCardProps {
  // interest: PartnerInterest;
  // currentUserId: string;
  partnerProfile?: PartnerProfile;
  isReceived?: boolean;
}

export const InterestCard = ({
  // interest,
  // currentUserId,
  partnerProfile,
  isReceived = false,
}: InterestCardProps) => {
  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });
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

  // const handleInterest = () => {
  //   // TODO: Implement interest response functionality
  //   console.log("Handle interest:", interest);
  // };

  return (
    <div className="group bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col gap-2">
      {/* Image Section */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden">
        {partnerProfile?.user?.image ? (
          <Image
            src={partnerProfile.user.image}
            alt={partnerProfile.user.name || "User profile"}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center ${
              isReceived
                ? "bg-gradient-to-br from-purple-100 to-pink-100"
                : "bg-gradient-to-br from-blue-100 to-indigo-100"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Heart
                  className={`w-8 h-8 ${
                    isReceived ? "text-purple-600" : "text-blue-600"
                  }`}
                />
              </div>
              <div className="text-xs font-medium text-gray-600">
                {isReceived ? "Interested in You" : "Your Interest"}
              </div>
            </div>
          </div>
        )}

        {/* Interest Status Overlay */}
        <div className="absolute top-2 right-2">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isReceived
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {isReceived ? "Received" : "Sent"}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col px-2 pb-2">
        {/* Interest Date */}
        {/* <div className="flex items-center gap-1 mb-1">
          <Calendar className="w-3 h-3 text-gray-500" />
          <p className="font-normal text-xs text-gray-600">
            {formatDate(interest.createdAt)}
          </p>
        </div> */}

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
