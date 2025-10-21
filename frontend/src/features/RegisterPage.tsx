"use client";

import type React from "react";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { RegisterInput } from "../types/auth";
import Image from "next/image";
import Link from "next/link";

export const RegisterPage = () => {
  const [formData, setFormData] = useState<
    RegisterInput & { confirmPassword: string }
  >({
    name: "",
    email: "",
    phone: "-/-",
    password: "",
    confirmPassword: "",
    image:
      "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    bio: [],
    age: 18,
    gender: "other",
    role: "renter",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = formData;

      await register(registerData);
    } catch (error) {
      console.error("Registration error:", error);

      // Handle different types of errors
      if (error instanceof Error) {
        // Check if it's a GraphQL error with more details
        if (
          error.message.includes("Email already exists") ||
          error.message.includes("duplicate")
        ) {
          setError(
            "This email is already registered. Please use a different email or try logging in."
          );
        } else if (
          error.message.includes("validation") ||
          error.message.includes("invalid")
        ) {
          setError("Please check your information and try again.");
        } else if (
          error.message.includes("network") ||
          error.message.includes("fetch")
        ) {
          setError(
            "Network error. Please check your connection and try again."
          );
        } else {
          setError(error.message);
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8" prefetch={true}>
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

        <div className="bg-card rounded-2xl shadow-sm border border-border p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-foreground mb-2 text-center">
            Create your account
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Join Shared Living to get started
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800 mb-1">
                    Registration Error
                  </h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
                <button
                  onClick={() => setError("")}
                  className="flex-shrink-0 text-red-400 hover:text-red-600 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                placeholder="Create a password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                placeholder="Confirm your password"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Account type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  htmlFor="renter-role"
                  className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.role === "renter"
                      ? "border-foreground bg-secondary"
                      : "border-input hover:border-foreground/30"
                  }`}
                >
                  <input
                    id="renter-role"
                    name="role"
                    type="radio"
                    value="renter"
                    checked={formData.role === "renter"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">
                      Renter
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Browse properties
                    </div>
                  </div>
                </label>

                <label
                  htmlFor="landlord-role"
                  className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.role === "landlord"
                      ? "border-foreground bg-secondary"
                      : "border-input hover:border-foreground/30"
                  }`}
                >
                  <input
                    id="landlord-role"
                    name="role"
                    type="radio"
                    value="landlord"
                    checked={formData.role === "landlord"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">
                      Landlord
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      List properties
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-primary-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
