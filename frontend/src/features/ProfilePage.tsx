"use client";

import { useState } from "react";
import { Footer, Header } from "@/components/navigations";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  ProfileSidebar,
  AboutMe,
  AccountSettings,
  Security,
  Listings,
} from "@/components/profile";

export const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const baseTabs = [
    { id: "personal", label: "About me" },
    { id: "account", label: "Account" },
    { id: "security", label: "Security" },
  ];

  const tabs =
    user?.role === "landlord"
      ? [...baseTabs, { id: "listings", label: "Listings" }]
      : baseTabs;

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <AboutMe user={user} />;
      case "account":
        return <AccountSettings user={user} />;
      case "security":
        return <Security />;
      case "listings":
        return <Listings />;
      default:
        return <AboutMe user={user} />;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <Header />

      <div className="max-w-[1280px] w-full flex flex-col lg:flex-row gap-4 lg:gap-12 py-6 lg:py-12 px-4">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex flex-col gap-8 lg:max-w-[280px] w-full">
          <p className="text-2xl lg:text-3xl font-semibold text-gray-900">
            Profile
          </p>
          <ProfileSidebar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-50 animate-in fade-in-0 duration-300">
            <div className="absolute bottom-0 left-0 right-0 bg-white shadow-xl overflow-y-auto animate-in slide-in-from-bottom-4 duration-300 ease-out rounded-t-2xl max-h-[90vh]">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Profile Menu</h2>
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
                <ProfileSidebar
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabChange={(tab) => {
                    setActiveTab(tab);
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
            <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
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

          {/* Tab Content */}
          <div className="w-full">{renderTabContent()}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
