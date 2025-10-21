import { MapPin, Bed, Bath, Users } from "lucide-react";
import type { ListingInfoProps } from "./types";

export const ListingInfo = ({
  title,
  location,
  pricePerMonth,
  bedrooms,
  bathrooms,
  shared,
  maxRoommates,
}: ListingInfoProps) => {
  return (
    <div className="space-y-6">
      {/* Title and Location */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {location.district}, {location.city}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Bed className="w-4 h-4" />
          <span>
            {bedrooms} bedroom{bedrooms !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Bath className="w-4 h-4" />
          <span>
            {bathrooms} bathroom{bathrooms !== 1 ? "s" : ""}
          </span>
        </div>

        {shared && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Shared • Up to {maxRoommates} roommates</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-foreground">
          ₮{pricePerMonth.toLocaleString()}
        </span>
        <span className="text-muted-foreground">per month</span>
      </div>
    </div>
  );
};
