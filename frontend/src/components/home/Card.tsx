import Image from "next/image";
import Link from "next/link";

// Define the GraphQL Property type for the Card component
type GraphQLProperty = {
  id: string;
  title: string;
  pricePerMonth: number;
  images?: string[] | null;
};

interface CardProps {
  listing: GraphQLProperty;
  onClick?: (listing: GraphQLProperty) => void;
}

export const Card = ({ listing, onClick }: CardProps) => {
  return (
    <Link href={`/listing/${listing.id}`} prefetch={true}>
      <div
        className="group bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col gap-2"
        role="button"
        onClick={() => onClick?.(listing)}
      >
        <div className="relative w-full h-40 rounded-xl overflow-hidden">
          <Image
            alt={`${listing.title} photo`}
            className="object-cover object-center"
            fill
            priority={false}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            src={listing.images?.[0] || "/placeholder-image.jpg"}
          />
        </div>

        <div className="flex flex-col px-1">
          <p className="font-normal text-sm truncate">{listing.title}</p>

          <p className="text-gray-900 font-normal text-xs">
            {listing.pricePerMonth.toLocaleString()}₮
            <span className="text-gray-500">/ month</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
