export type UserRole = "admin" | "user";

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  fullName: string;
  role: UserRole;
}
