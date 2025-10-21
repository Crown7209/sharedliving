export type UserRole = "landlord" | "renter";
export type Gender = "male" | "female" | "other";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  image: string;
  bio: string[];
  age?: number;
  gender?: Gender;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

// GraphQL Input Types
export type CreateUserInput = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  image?: string;
  bio?: string[];
  age?: number;
  gender?: Gender;
  role: UserRole;
};

export type UpdateUserInput = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  image?: string;
  bio?: string[];
  age?: number;
  gender?: Gender;
  role?: UserRole;
};

export type LoginInput = {
  email: string;
  password: string;
};

// GraphQL Response Types
export type UserResponse = {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
};

export type UsersResponse = {
  success: boolean;
  message: string;
  users: User[];
  totalCount: number;
};
