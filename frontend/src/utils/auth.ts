import { User, UserRole } from "../types/auth";

const AUTH_STORAGE_KEY = "sera_user";
const TOKEN_STORAGE_KEY = "sera_token";

export const authUtils = {
  // Store user in localStorage
  setUser: (user: User): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
  },

  // Store token in localStorage
  setToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  },

  // Get user from localStorage
  getUser: (): User | null => {
    if (typeof window === "undefined") return null;

    try {
      const userData = localStorage.getItem(AUTH_STORAGE_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  // Remove user from localStorage
  removeUser: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return authUtils.getUser() !== null && authUtils.getToken() !== null;
  },

  // Check if user has specific role
  hasRole: (role: UserRole): boolean => {
    const user = authUtils.getUser();
    return user?.role === role;
  },

  // Check if user is landlord
  isLandlord: (): boolean => {
    return authUtils.hasRole("landlord");
  },

  // Check if user is renter
  isTenant: (): boolean => {
    return authUtils.hasRole("renter");
  },
};
