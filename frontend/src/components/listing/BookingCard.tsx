"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { BookingCardProps } from "./types";
import { toast } from "sonner";
import { useGetPartnerProfilesByUserQuery } from "@/generated/graphql";

export const BookingCard = ({
  pricePerMonth,
  availableFrom,
  availableTo,
  propertyId,
}: BookingCardProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState("1");
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  // Check if current user has a partner profile
  const { data: userProfileData } = useGetPartnerProfilesByUserQuery({
    variables: { userId: user?.id || "" },
    skip: !user?.id,
    fetchPolicy: "cache-first",
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleReserve = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Validate required fields
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (checkIn >= checkOut) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    // console.log("Reserve clicked", {
    //   checkIn: checkIn?.toISOString().split("T")[0],
    //   checkOut: checkOut?.toISOString().split("T")[0],
    //   guests: Number(guests),
    // });
    toast.success("Reservation successful");
    router.push("/");
  };

  const handleFindRoommate = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Check if user has created a partner profile
    const userHasProfile =
      userProfileData?.getPartnerProfilesByUser?.profiles?.length &&
      userProfileData.getPartnerProfilesByUser.profiles.length > 0;

    if (userHasProfile) {
      // If user has a profile, redirect to partners page with propertyId
      router.push(`/partners?propertyId=${encodeURIComponent(propertyId)}`);
    } else {
      // If user doesn't have a profile, redirect to create profile page
      router.push(
        `/partner-profile?propertyId=${encodeURIComponent(propertyId)}`
      );
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 space-y-6">
      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-foreground">
          ₮{pricePerMonth.toLocaleString()}
        </span>
        <span className="text-muted-foreground">per month</span>
      </div>

      {/* Availability */}
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span>Available from {formatDate(availableFrom)}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span>Available until {formatDate(availableTo)}</span>
        </div>
      </div>

      {/* Booking Form */}
      <div className="space-y-4">
        {/* Check-in */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Check-in
          </label>
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal shadow-none",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? (
                  checkIn.toLocaleDateString("en-GB")
                ) : (
                  <span>Select check-in date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={(date) => {
                  setCheckIn(date);
                  setCheckInOpen(false);
                }}
                disabled={(date) =>
                  date < new Date(availableFrom) || date > new Date(availableTo)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Check-out
          </label>
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal shadow-none",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? (
                  checkOut.toLocaleDateString("en-GB")
                ) : (
                  <span>Select check-out date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={(date) => {
                  setCheckOut(date);
                  setCheckOutOpen(false);
                }}
                disabled={(date) =>
                  date < (checkIn || new Date(availableFrom)) ||
                  date > new Date(availableTo)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Guests</label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full shadow-none">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} guest{num !== 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleReserve}
            className="w-full bg-foreground text-background py-3 rounded-md font-normal hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            Reserve
          </button>

          <button
            onClick={handleFindRoommate}
            className="w-full border border-border text-foreground py-3 rounded-md font-normal hover:bg-muted transition-colors cursor-pointer"
          >
            Find roommate for this property
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>You won&apos;t be charged yet</p>
      </div>
    </div>
  );
};
