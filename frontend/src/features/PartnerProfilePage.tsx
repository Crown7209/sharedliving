"use client";

import { Header } from "@/components/navigations";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreatePartnerProfileForm } from "@/hooks/useCreatePartnerProfileForm";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { GenderPreferenceEnum } from "@/generated/graphql";

export const PartnerProfilePage = () => {
  const { user } = useAuth();
  const {
    preferredLocation,
    setPreferredLocation,
    budgetMin,
    setBudgetMin,
    budgetMax,
    setBudgetMax,
    moveInDate,
    setMoveInDate,
    stayDurationMonths,
    setStayDurationMonths,
    roommateCount,
    setRoommateCount,
    genderPreference,
    setGenderPreference,
    about,
    setAbout,
    isSubmitting,
    errorMessage,
    hasExistingProfile,
    handleCreatePartnerProfile,
  } = useCreatePartnerProfileForm();

  const [open, setOpen] = useState(false);

  const selectedDate = moveInDate ? new Date(moveInDate) : undefined;

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <Header />

      <div className="max-w-[480px] w-full py-12 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {hasExistingProfile ? "Update your profile" : "Find a roommate"}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {hasExistingProfile
              ? "Update your details to find better matches."
              : "Fill out the details so we can help you find the best match."}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          {/* user profile picture */}
          <div className="flex flex-col gap-2 items-center">
            <div className="relative">
              <Image
                src={
                  user?.image ||
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                }
                alt="User profile"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              {user?.name || "Your profile picture"}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-700">
              Preferred location
            </label>
            <input
              type="text"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-all duration-200"
              placeholder="e.g., Bayanzurkh"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-700">
              Move in date
            </label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="move-in"
                  className="w-full h-[42px] rounded-lg shadow-none justify-between font-normal border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-GB") // dd/mm/yyyy формат
                    : "Select move-in date"}
                  <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      const isoString = date.toISOString().split("T")[0];
                      setMoveInDate(isoString);
                    }
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center ">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Budget min (₮)
              </label>
              <input
                type="number"
                min={0}
                value={budgetMin}
                onChange={(e) =>
                  setBudgetMin(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-all duration-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Budget max (₮)
              </label>
              <input
                type="number"
                min={0}
                value={budgetMax}
                onChange={(e) =>
                  setBudgetMax(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-all duration-200"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center ">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Stay duration (months)
              </label>
              <input
                type="number"
                min={1}
                value={stayDurationMonths}
                onChange={(e) =>
                  setStayDurationMonths(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-all duration-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Roommates needed<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                value={roommateCount}
                onChange={(e) =>
                  setRoommateCount(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-700">
              Gender preference
            </label>
            <div className="flex gap-3">
              {(["ANY", "MALE", "FEMALE"] as const).map((g) => (
                <label
                  key={g}
                  className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                    genderPreference === g
                      ? "bg-gray-900 text-white border-gray-900"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="genderPref"
                    value={g}
                    checked={genderPreference === g}
                    onChange={() =>
                      setGenderPreference(g as GenderPreferenceEnum)
                    }
                    className="hidden"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-all duration-200"
              placeholder="Tell potential roommates about yourself and expectations"
            />
          </div>
          {errorMessage && (
            <div className="text-sm text-red-600">{errorMessage}</div>
          )}
          <button
            onClick={handleCreatePartnerProfile}
            disabled={isSubmitting}
            className="w-full mt-2 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-60 focus:outline-none"
          >
            {isSubmitting
              ? hasExistingProfile
                ? "Updating..."
                : "Creating..."
              : hasExistingProfile
              ? "Update Profile"
              : "Create Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};
