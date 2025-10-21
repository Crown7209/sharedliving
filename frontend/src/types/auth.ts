export type UserRole = "landlord" | "renter";
export type Gender = "male" | "female" | "other";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image: string;
  bio: string[];
  age?: number;
  gender?: Gender;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterInput) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone?: string;
  password: string;
  image?: string;
  bio?: string[];
  age?: number;
  gender?: Gender;
  role: UserRole;
}
