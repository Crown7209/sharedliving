"use client";

import { useState, useRef, useEffect } from "react";
import { PartnerProfile, InterestStatusEnum } from "@/generated/graphql";
import { Heart, X, RotateCcw } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MobileSwipeContainerProps {
  profiles: PartnerProfile[];
  onInterest: (
    profile: PartnerProfile,
    status: "INTERESTED" | "SKIPPED"
  ) => void;
  currentUserId?: string;
  getUserInterestStatus: (targetUserId: string) => InterestStatusEnum | null;
}

export const MobileSwipeContainer = ({
  profiles,
  onInterest,
  // currentUserId,
  getUserInterestStatus,
}: MobileSwipeContainerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [interestStatuses, setInterestStatuses] = useState<
    Map<string, InterestStatusEnum>
  >(new Map());

  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  // Reset to first profile when profiles change
  useEffect(() => {
    setCurrentIndex(0);
    setSwipeDirection(null);
    setIsAnimating(false);
  }, [profiles]);

  // Load interest statuses for all profiles
  useEffect(() => {
    if (profiles.length > 0 && getUserInterestStatus) {
      const statusMap = new Map<string, InterestStatusEnum>();
      profiles.forEach((profile) => {
        if (profile.userId) {
          const status = getUserInterestStatus(profile.userId);
          if (status) {
            statusMap.set(profile.userId, status);
          }
        }
      });
      setInterestStatuses(statusMap);
    }
  }, [profiles, getUserInterestStatus]);

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating || !currentProfile) return;

    setIsAnimating(true);
    setSwipeDirection(direction);

    // Trigger interest action
    const status = direction === "right" ? "INTERESTED" : "SKIPPED";
    onInterest(currentProfile, status);

    // Update interest status in local state
    if (currentProfile.userId) {
      setInterestStatuses((prev) => {
        const newMap = new Map(prev);
        newMap.set(currentProfile.userId!, status as InterestStatusEnum);
        return newMap;
      });
    }

    // Move to next profile after animation
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    e.preventDefault();
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isAnimating) return;
    e.preventDefault();
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || isAnimating) return;
    e.preventDefault();

    const deltaX = currentX - startX;
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      handleSwipe(deltaX > 0 ? "right" : "left");
    }

    setIsDragging(false);
    setCurrentX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return;
    e.preventDefault();
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isAnimating) return;
    e.preventDefault();
    setCurrentX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || isAnimating) return;
    e.preventDefault();

    const deltaX = currentX - startX;
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      handleSwipe(deltaX > 0 ? "right" : "left");
    }

    setIsDragging(false);
    setCurrentX(0);
  };

  // Calculate card transform based on drag/swipe
  const getCardTransform = () => {
    if (isAnimating && swipeDirection) {
      return swipeDirection === "right"
        ? "translateX(100vw) rotate(30deg)"
        : "translateX(-100vw) rotate(-30deg)";
    }

    if (isDragging) {
      const deltaX = currentX - startX;
      const rotation = deltaX * 0.1;
      return `translateX(${deltaX}px) rotate(${rotation}deg)`;
    }

    return "translateX(0) rotate(0deg)";
  };

  const getNextCardTransform = () => {
    if (isAnimating && swipeDirection) {
      return "scale(0.95) translateY(20px)";
    }
    return "scale(0.95) translateY(20px)";
  };

  const formatBudget = (profile: PartnerProfile) => {
    if (profile.budgetMin && profile.budgetMax) {
      return `${profile.budgetMin.toLocaleString()}₮ - ${profile.budgetMax.toLocaleString()}₮`;
    } else if (profile.budgetMin) {
      return `From ${profile.budgetMin.toLocaleString()}₮`;
    } else if (profile.budgetMax) {
      return `Up to ${profile.budgetMax.toLocaleString()}₮`;
    }
    return "Budget not specified";
  };

  const getCurrentInterestStatus = () => {
    if (!currentProfile?.userId) return null;
    return interestStatuses.get(currentProfile.userId) || null;
  };

  const isInterested =
    getCurrentInterestStatus() === InterestStatusEnum.INTERESTED;
  const isSkipped = getCurrentInterestStatus() === InterestStatusEnum.SKIPPED;

  if (!currentProfile) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-179px)] text-center px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          All caught up!
        </h3>
        <p className="text-gray-600 mb-6">
          You&apos;ve seen all available partner profiles. Check back later for
          new matches!
        </p>
        <Button onClick={() => setCurrentIndex(0)} className="cursor-pointer">
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-179px)] flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-full h-full touch-none select-none"
        style={{ touchAction: "none" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Next Card (Background) */}
        {nextProfile && (
          <div
            className="absolute inset-0 bg-white rounded-2xl border border-gray-200 transition-transform duration-300 ease-out"
            style={{ transform: getNextCardTransform() }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={
                  nextProfile.user?.image ||
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                }
                alt={nextProfile.user?.name || "User"}
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* Current Card */}
        <div
          ref={cardRef}
          className="absolute inset-0 bg-white rounded-2xl border border-gray-200 transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
          style={{ transform: getCardTransform() }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {/* Profile Image */}
            <Image
              src={
                currentProfile.user?.image ||
                "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              }
              alt={currentProfile.user?.name || "User"}
              fill
              className="object-cover object-center"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Status Indicators */}
            {isInterested && (
              <div className="absolute top-4 right-4 bg-red-50 text-red-600 border border-red-200 p-2 rounded-full">
                <Heart className="w-4 h-4 fill-current" />
              </div>
            )}
            {isSkipped && (
              <div className="absolute top-4 right-4 bg-gray-100 text-gray-700 border border-gray-200 p-2 rounded-full">
                <X className="w-4 h-4" />
              </div>
            )}

            {/* Profile Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-bold mb-1">
                {currentProfile.user?.name || "Anonymous"}
              </h3>
              {currentProfile.preferredLocation && (
                <p className="text-sm opacity-90 mb-2">
                  📍 {currentProfile.preferredLocation}
                </p>
              )}
              <p className="text-sm opacity-90 mb-1">
                💰 {formatBudget(currentProfile)}
              </p>
              <p className="text-sm opacity-90">
                👥 Needs {currentProfile.roommateCount} roommate
                {currentProfile.roommateCount !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Swipe Indicators */}
            {isDragging && (
              <>
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <div
                    className={`p-4 rounded-full text-sm font-semibold opacity-80 ${
                      isSkipped
                        ? "bg-gray-100 text-gray-700 border border-gray-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <div
                    className={`p-4 rounded-full text-sm font-semibold opacity-80 ${
                      isInterested
                        ? "bg-red-600 text-white border border-red-200"
                        : "bg-red-50 text-red-600 border border-red-200"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInterested ? "fill-current" : ""
                      }`}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
