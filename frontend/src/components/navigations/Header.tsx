"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-50 border-b border-gray-300 px-4 sm:px-8 lg:px-12 py-4">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center cursor-pointer w-full"
          prefetch={true}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Shared Living"
              width={40}
              height={40}
              className="rounded-md"
            />
            <p className="text-xl font-semibold text-gray-900 hidden sm:block">
              Shared Living
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
            prefetch={true}
          >
            Homes
          </Link>
          <Link
            href="/partners"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
            prefetch={true}
          >
            Partners
          </Link>
          {user && user.role === "renter" && (
            <Link
              href="/matches"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
              prefetch={true}
            >
              Matches
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4 w-full justify-end">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Show different links based on user role */}
          {user ? (
            <>
              {user.role === "landlord" && (
                <Link
                  href="/hosting"
                  className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                  prefetch={true}
                >
                  Become a host
                </Link>
              )}

              {user.role === "renter" && (
                <Link
                  href="/partner-profile"
                  className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                  prefetch={true}
                >
                  Become a partner
                </Link>
              )}

              <div className="relative">
                <div
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-full border border-gray-300 transition-all cursor-pointer"
                >
                  <Link href="/profile" prefetch={true}>
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Link>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setIsUserMenuOpen(false)}
                        prefetch={true}
                      >
                        Profile
                      </Link>
                      {user.role === "landlord" && (
                        <Link
                          href="/hosting"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                          onClick={() => setIsUserMenuOpen(false)}
                          prefetch={true}
                        >
                          Become a host
                        </Link>
                      )}
                      {user.role === "renter" && (
                        <Link
                          href="/partner-profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                          onClick={() => setIsUserMenuOpen(false)}
                          prefetch={true}
                        >
                          Become a partner
                        </Link>
                      )}
                      <Link
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setIsUserMenuOpen(false)}
                        prefetch={true}
                      >
                        Browse Listings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link href="/login" prefetch={true}>
              <button className="px-4 py-2 text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200 cursor-pointer text-sm leading-6 font-medium">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-40 animate-in fade-in-0 duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="absolute top-20 p-4 rounded-lg mx-4 left-0 right-0 bg-white shadow-lg animate-in slide-in-from-top-4 duration-300 ease-out">
            <div className="space-y-4">
              <Link
                href="/"
                className="block text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={true}
              >
                Homes
              </Link>
              <Link
                href="/partners"
                className="block text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={true}
              >
                Partners
              </Link>
              {user && user.role === "renter" && (
                <Link
                  href="/matches"
                  className="block text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  prefetch={true}
                >
                  Matches
                </Link>
              )}
              {user && user.role === "landlord" && (
                <Link
                  href="/hosting"
                  className="block text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  prefetch={true}
                >
                  Become a host
                </Link>
              )}
              {user && user.role === "renter" && (
                <Link
                  href="/partner-profile"
                  className="block text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  prefetch={true}
                >
                  Become a partner
                </Link>
              )}
              {user && (
                <Link
                  href="/profile"
                  className="block text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  prefetch={true}
                >
                  Profile
                </Link>
              )}
              {!user && (
                <Link
                  href="/login"
                  className="block text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  prefetch={true}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {isSearchFocused && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSearchFocused(false)}
        >
          <div className="bg-white p-4 mx-4 mt-20 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Where are you going?"
                className="flex-1 outline-none text-lg"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="font-medium">Anywhere</div>
                <div className="text-sm text-gray-500">I&apos;m flexible</div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="font-medium">Any week</div>
                <div className="text-sm text-gray-500">Add dates</div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="font-medium">Add guests</div>
                <div className="text-sm text-gray-500">Who&apos;s coming?</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
