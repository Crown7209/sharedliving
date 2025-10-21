"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Footer, Header } from "@/components/navigations";
import {
  PartnerCard,
  PartnerFilters,
  MobileSwipeContainer,
} from "@/components/partners";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Settings2, X } from "lucide-react";
import {
  useGetPartnerProfilesQuery,
  useCreatePartnerInterestMutation,
  useGetPartnerInterestsByUserQuery,
  useGetPartnerProfilesByUserQuery,
  PartnerProfile,
  InterestStatusEnum,
} from "@/generated/graphql";
import { toast } from "sonner";
import { SelectedFilters, SortDropdown } from "@/components/home";
import { FilterOptions, SortOption } from "@/components/home/types";
import { PartnerCardSkeleton } from "@/components/partners/PartnerCardSkeleton";

export const PartnersPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [processingProfileId, setProcessingProfileId] = useState<string | null>(
    null
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const propertyId = searchParams?.get("propertyId");

  const { data, loading } = useGetPartnerProfilesQuery({
    fetchPolicy: "cache-first",
  });

  // Fetch existing interests for the current user
  const { data: interestsData, refetch: refetchInterests } =
    useGetPartnerInterestsByUserQuery({
      variables: { userId: user?.id || "" },
      skip: !user?.id,
      fetchPolicy: "cache-and-network",
    });

  // Check if current user has a partner profile
  const { data: userProfileData } = useGetPartnerProfilesByUserQuery({
    variables: { userId: user?.id || "" },
    skip: !user?.id,
    fetchPolicy: "cache-and-network",
  });

  const [createPartnerInterestMutation] = useCreatePartnerInterestMutation();

  // Helper function to check if user has expressed interest in a profile
  const getUserInterestStatus = useCallback(
    (targetUserId: string) => {
      if (!interestsData?.getPartnerInterestsByUser?.interests) return null;

      const interest = interestsData.getPartnerInterestsByUser.interests.find(
        (interest) => interest.targetUserId === targetUserId
      );

      return interest?.status || null;
    },
    [interestsData]
  );

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    city: undefined,
    district: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minRooms: undefined,
    maxRooms: undefined,
    shared: undefined,
    sort: undefined,
  });

  // Get filtered profiles
  const allProfiles = useMemo(() => {
    return (
      data?.getPartnerProfiles?.profiles?.filter(
        (profile) => profile.isLookingForPartner && profile.userId !== user?.id
      ) || []
    );
  }, [data?.getPartnerProfiles?.profiles, user?.id]);

  // Get unique locations from profiles
  const availableCities = useMemo(() => {
    return Array.from(
      new Set(
        allProfiles.map((profile) => profile.preferredLocation).filter(Boolean)
      )
    ).sort();
  }, [allProfiles]);

  const availableDistricts = useMemo(() => {
    // For partners, we'll use preferredLocation as both city and district
    return availableCities;
  }, [availableCities]);

  // Filter profiles based on current filters
  const filteredProfiles = useMemo(() => {
    let filtered = allProfiles.filter((profile) => {
      // Location filter (using preferredLocation)
      if (filters.city && profile.preferredLocation !== filters.city) {
        return false;
      }

      // Budget filter
      if (
        filters.minPrice &&
        profile.budgetMin &&
        profile.budgetMin < filters.minPrice
      ) {
        return false;
      }
      if (
        filters.maxPrice &&
        profile.budgetMax &&
        profile.budgetMax > filters.maxPrice
      ) {
        return false;
      }

      // Roommate count filter (using minRooms as roommate count)
      if (
        filters.minRooms &&
        profile.roommateCount &&
        profile.roommateCount < filters.minRooms
      ) {
        return false;
      }
      if (
        filters.maxRooms &&
        profile.roommateCount &&
        profile.roommateCount > filters.maxRooms
      ) {
        return false;
      }

      return true;
    });

    // Apply sorting
    if (filters.sort) {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sort) {
          case "price-asc":
            return (a.budgetMin || 0) - (b.budgetMin || 0);
          case "price-desc":
            return (b.budgetMin || 0) - (a.budgetMin || 0);
          case "newest":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "oldest":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [allProfiles, filters]);

  const handleInterest = async (
    profile: PartnerProfile,
    status: "INTERESTED" | "SKIPPED"
  ) => {
    if (!user?.id) {
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

    setProcessingProfileId(profile.id);

    try {
      const { data: result } = await createPartnerInterestMutation({
        variables: {
          input: {
            userId: user.id,
            targetUserId: profile.userId,
            propertyId: propertyId || undefined,
            status: status as InterestStatusEnum,
          },
        },
      });

      if (result?.createPartnerInterest?.success) {
        // Refetch interests data to update the cache
        await refetchInterests();

        if (status === "INTERESTED") {
          if (
            result.createPartnerInterest.matchCreated &&
            result.createPartnerInterest.match
          ) {
            // Add notification for the match
            addNotification({
              id: result.createPartnerInterest.match.id,
              userId: user.id,
              matchedUserId: profile.userId,
              matchedUserName: profile.userId, // TODO: Get actual user name
              propertyId: propertyId || undefined,
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
      setProcessingProfileId(null);
    }
  };

  // Handle filter changes
  const updateFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  // Handle sort change
  const handleSortChange = useCallback(
    (sort: SortOption) => {
      updateFilters({ ...filters, sort });
    },
    [filters, updateFilters]
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <Header />

      <div className="max-w-[1280px] w-full flex gap-4 lg:gap-12 py-6 lg:py-12 px-4 relative">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block max-w-[280px] w-full">
          <PartnerFilters
            filters={filters}
            onFiltersChange={updateFilters}
            availableCities={availableCities as string[]}
            availableDistricts={availableDistricts as string[]}
            loading={loading}
          />
        </div>

        {/* Mobile Filters Overlay */}
        {isFiltersOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-50 animate-in fade-in-0 duration-300">
            <div className="absolute bottom-0 left-0 right-0 bg-white shadow-xl overflow-y-auto animate-in slide-in-from-bottom-4 duration-300 ease-out rounded-t-2xl max-h-[90vh]">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFiltersOpen(false)}
                  className="cursor-pointer"
                >
                  <X size={20} />
                </Button>
              </div>
              <div className="p-4">
                <PartnerFilters
                  filters={filters}
                  onFiltersChange={updateFilters}
                  availableCities={availableCities as string[]}
                  availableDistricts={availableDistricts as string[]}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        )}

        <div className="w-full flex flex-col gap-4 lg:gap-5">
          {/* Mobile Filter Toggle & Sort */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 cursor-pointer shadow-none"
            >
              <Settings2 size={16} />
              Filters
            </Button>

            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="hidden lg:block">
                <SelectedFilters
                  filters={filters}
                  onFiltersChange={updateFilters}
                />
              </div>
              <SortDropdown
                sort={filters.sort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>

          {/* Mobile Swipe Interface */}
          <div className="lg:hidden w-full">
            {loading ? (
              <div className="flex justify-center items-center h-[calc(100vh-179px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredProfiles.length > 0 ? (
              <MobileSwipeContainer
                profiles={filteredProfiles}
                onInterest={handleInterest}
                currentUserId={user?.id}
                getUserInterestStatus={getUserInterestStatus}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-base">
                  No partner profiles found matching your criteria.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid grid-cols-4 xl:grid-cols-5 gap-5">
            {loading
              ? Array.from({ length: 15 }).map((_, index) => (
                  <PartnerCardSkeleton key={index} />
                ))
              : filteredProfiles.map((profile) => (
                  <PartnerCard
                    key={profile.id}
                    profile={profile}
                    onInterest={handleInterest}
                    currentUserId={user?.id}
                    isProcessing={processingProfileId === profile.id}
                    existingInterestStatus={getUserInterestStatus(
                      profile.userId
                    )}
                  />
                ))}
          </div>

          {/* Desktop Empty State */}
          {!loading && filteredProfiles.length === 0 && (
            <div className="hidden lg:block text-center py-12">
              <p className="text-gray-500 text-lg">
                No partner profiles found matching your criteria.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:block w-full">
        <Footer />
      </div>
    </div>
  );
};
