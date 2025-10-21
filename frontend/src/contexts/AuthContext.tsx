"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, AuthContextType, RegisterInput } from "../types/auth";
import { authUtils } from "../utils/auth";
import { CreateUserInput, useCreateUserMutation } from "../generated/graphql";
import { useLoginMutation } from "../generated/graphql";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [createUserMutation] = useCreateUserMutation();
  const [loginMutation] = useLoginMutation();

  useEffect(() => {
    const savedUser = authUtils.getUser();
    const savedToken = authUtils.getToken();

    if (savedUser && savedToken) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const { data } = await loginMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      if (data?.login?.success && data?.login?.user && data?.login?.token) {
        const userData = data.login.user;
        setUser(userData as User);
        authUtils.setUser(userData as User);
        authUtils.setToken(data.login.token);

        // Redirect based on role
        if (userData.role === "landlord") {
          router.push("/hosting");
        } else {
          router.push("/");
        }
      } else {
        throw new Error(data?.login?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterInput) => {
    try {
      setIsLoading(true);

      const { data, errors } = await createUserMutation({
        variables: {
          input: userData as CreateUserInput,
        },
      });

      // Handle GraphQL errors
      if (errors && errors.length > 0) {
        const errorMessage = errors[0]?.message || "Registration failed";
        throw new Error(errorMessage);
      }

      // Handle network errors or missing data
      if (!data?.createUser) {
        throw new Error(
          "No response from server. Please check your connection and try again."
        );
      }

      if (
        data?.createUser?.success &&
        data?.createUser?.user &&
        data?.createUser?.token
      ) {
        const newUser = data.createUser.user;
        setUser(newUser as User);
        authUtils.setUser(newUser as User);
        authUtils.setToken(data.createUser.token);

        // Redirect based on role
        if (newUser.role === "landlord") {
          router.push("/hosting");
        } else {
          router.push("/");
        }
      } else {
        // Handle backend errors
        const errorMessage = data?.createUser?.message || "Registration failed";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Re-throw the error with better context
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    authUtils.removeUser();
    router.push("/login");
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
