"use client";

import { Footer, Header } from "@/components/navigations";
import {
  useGetPartnerMatchesByUserQuery,
  useGetPartnerInterestsByUserQuery,
  useGetPartnerInterestsByTargetQuery,
  useGetPartnerProfilesQuery,
  PartnerProfile,
} from "@/generated/graphql";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  MatchCard,
  InterestCard,
  EmptyState,
  MatchesSidebar,
} from "@/components/matches";

export const MatchesPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"matches" | "sent" | "received">(
    "matches"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get matches
  const {
    data: matchesData,
    // loading: matchesLoading,
    // error: matchesError,
    // refetch: refetchMatches,
  } = useGetPartnerMatchesByUserQuery({
    variables: {
      userId: user?.id || "",
    },
    skip: !user?.id,
    fetchPolicy: "cache-and-network",
  });

  // Get user's sent interests
  const {
    data: sentInterestsData,
    // loading: sentInterestsLoading,
    // error: sentInterestsError,
    // refetch: refetchSentInterests,
  } = useGetPartnerInterestsByUserQuery({
    variables: {
      userId: user?.id || "",
    },
    skip: !user?.id,
    fetchPolicy: "cache-and-network",
  });

  // Get interests received by user
  const {
    data: receivedInterestsData,
    // loading: receivedInterestsLoading,
    // error: receivedInterestsError,
    // refetch: refetchReceivedInterests,
  } = useGetPartnerInterestsByTargetQuery({
    variables: {
      targetUserId: user?.id || "",
    },
    skip: !user?.id,
    fetchPolicy: "cache-and-network",
  });

  // Get all partner profiles for user information
  const { data: profilesData } = useGetPartnerProfilesQuery({
    fetchPolicy: "cache-first",
  });

  const matches = matchesData?.getPartnerMatchesByUser?.matches || [];
  const sentInterests =
    sentInterestsData?.getPartnerInterestsByUser?.interests || [];
  const receivedInterests =
    receivedInterestsData?.getPartnerInterestsByTarget?.interests || [];
  // Create a map of user IDs to profiles for quick lookup
  const profileMap = useMemo(() => {
    const allProfiles = profilesData?.getPartnerProfiles?.profiles || [];
    const map = new Map<string, PartnerProfile>();
    allProfiles.forEach((profile) => {
      map.set(profile.userId, profile);
    });
    return map;
  }, [profilesData?.getPartnerProfiles?.profiles]);

  // Filter only INTERESTED status interests and exclude matches
  const filteredSentInterests = sentInterests.filter((interest) => {
    if (interest.status !== "INTERESTED") return false;

    // Check if this interest resulted in a match
    const hasMatch = matches.some(
      (match) =>
        (match.userAId === interest.userId &&
          match.userBId === interest.targetUserId) ||
        (match.userBId === interest.userId &&
          match.userAId === interest.targetUserId)
    );

    return !hasMatch; // Only include if no match exists
  });

  const filteredReceivedInterests = receivedInterests.filter((interest) => {
    if (interest.status !== "INTERESTED") return false;

    // Check if this interest resulted in a match
    const hasMatch = matches.some(
      (match) =>
        (match.userAId === interest.userId &&
          match.userBId === interest.targetUserId) ||
        (match.userBId === interest.userId &&
          match.userAId === interest.targetUserId)
    );

    return !hasMatch; // Only include if no match exists
  });

  // const isLoading =
  //   matchesLoading ||
  //   sentInterestsLoading ||
  //   receivedInterestsLoading ||
  //   profilesLoading;
  // const hasError = matchesError || sentInterestsError || receivedInterestsError;

  if (!user) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center bg-white">
        <Header />
        <div className="max-w-[1280px] w-full flex items-center justify-center py-12 lg:py-20 px-4">
          <div className="text-center">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              Please log in
            </h1>
            <p className="text-gray-600">Please log in to view your matches</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "matches", label: "Matches", count: matches.length },
    {
      id: "sent",
      label: "Sent Interests",
      count: filteredSentInterests.length,
    },
    {
      id: "received",
      label: "Received Interests",
      count: filteredReceivedInterests.length,
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <Header />

      <div className="max-w-[1280px] w-full flex flex-col lg:flex-row gap-4 lg:gap-12 py-6 lg:py-12 px-4">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex flex-col gap-8 lg:max-w-[280px] w-full">
          <p className="text-2xl lg:text-3xl font-semibold text-gray-900">
            Matches
          </p>
          <MatchesSidebar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId)}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-50 animate-in fade-in-0 duration-300">
            <div className="absolute bottom-0 left-0 right-0 bg-white shadow-xl overflow-y-auto animate-in slide-in-from-bottom-4 duration-300 ease-out rounded-t-2xl max-h-[90vh]">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Matches Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(false)}
                  className="cursor-pointer"
                >
                  <X size={20} />
                </Button>
              </div>
              <div className="p-4">
                <MatchesSidebar
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabChange={(tabId) => {
                    setActiveTab(tabId);
                    setIsSidebarOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="w-full flex flex-col gap-4 lg:gap-5">
          {/* Mobile Header with Menu Toggle */}
          <div className="flex items-center justify-between lg:hidden">
            <h1 className="text-2xl font-semibold text-gray-900">Matches</h1>
            <Button
              variant="outline"
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Menu size={16} />
              Menu
            </Button>
          </div>

          {/* Desktop Divider */}
          <div className="block lg:hidden w-full h-[1px] bg-gray-300"></div>

          {/* Content Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              {activeTab === "matches" && "Your Matches"}
              {activeTab === "sent" && "Sent Interests"}
              {activeTab === "received" && "Received Interests"}
            </h1>
            <p className="text-gray-600 text-sm">
              {activeTab === "matches" &&
                "Connect with people who are interested in shared living"}
              {activeTab === "sent" &&
                "Interests you've sent to potential roommates"}
              {activeTab === "received" &&
                "Interests received from potential roommates"}
            </p>
          </div>

          {activeTab === "matches" && (
            <>
              {matches.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
                  {matches.map((match) => {
                    const otherUserId =
                      match.userAId === user.id ? match.userBId : match.userAId;
                    const partnerProfile = profileMap.get(otherUserId);
                    return (
                      <MatchCard
                        key={match.id}
                        match={match}
                        currentUserId={user.id}
                        partnerProfile={partnerProfile}
                      />
                    );
                  })}
                </div>
              ) : (
                <EmptyState
                  title="No matches yet"
                  description="Start browsing partner profiles to find your perfect roommate match!"
                  buttonText="Browse Partners"
                  onButtonClick={() => (window.location.href = "/partners")}
                />
              )}
            </>
          )}

          {activeTab === "sent" && (
            <>
              {filteredSentInterests.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
                  {filteredSentInterests.map((interest) => {
                    const partnerProfile = profileMap.get(
                      interest.targetUserId
                    );
                    return (
                      <InterestCard
                        key={interest.id}
                        // interest={interest}
                        // currentUserId={user.id}
                        partnerProfile={partnerProfile}
                        isReceived={false}
                      />
                    );
                  })}
                </div>
              ) : (
                <EmptyState
                  title="No interests sent yet"
                  description="Browse partner profiles and express your interest to find potential roommates!"
                  buttonText="Browse Partners"
                  onButtonClick={() => (window.location.href = "/partners")}
                />
              )}
            </>
          )}

          {activeTab === "received" && (
            <>
              {filteredReceivedInterests.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
                  {filteredReceivedInterests.map((interest) => {
                    const partnerProfile = profileMap.get(interest.userId);
                    return (
                      <InterestCard
                        key={interest.id}
                        // interest={interest}
                        // currentUserId={user.id}
                        partnerProfile={partnerProfile}
                        isReceived={true}
                      />
                    );
                  })}
                </div>
              ) : (
                <EmptyState
                  title="No interests received yet"
                  description="Complete your partner profile to attract potential roommates!"
                  buttonText="Complete Profile"
                  onButtonClick={() =>
                    (window.location.href = "/partner-profile")
                  }
                />
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
