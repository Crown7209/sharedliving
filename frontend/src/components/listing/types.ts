export interface Host {
  id: string;
  name: string;
  photo: string;
  rating: number;
}

export interface Location {
  city: string;
  district: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  host: Host;
  location: Location;
  pricePerMonth: number;
  bedrooms: number;
  bathrooms: number;
  shared: boolean;
  maxRoommates: number;
  images: string[];
  amenities: string[];
  availableFrom: string;
  availableTo: string;
  reviews: Review[];
}

export interface HeroSectionProps {
  images: string[];
  title: string;
}

export interface ListingInfoProps {
  title: string;
  location: Location;
  pricePerMonth: number;
  bedrooms: number;
  bathrooms: number;
  shared: boolean;
  maxRoommates: number;
}

export interface HostProfileProps {
  host: Host;
}

export interface AmenitiesProps {
  amenities: string[];
}

export interface ReviewsProps {
  reviews: Review[];
}

export interface BookingCardProps {
  pricePerMonth: number;
  availableFrom: string;
  availableTo: string;
  propertyId: string;
}
