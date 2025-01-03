import type { User, Team } from "../types/user";
import { Role } from "../types/user";

export const mockUsers: User[] = [
  {
    id: "1",
    fullName: "Admin User",
    email: "admin@example.com",
    role: Role.ADMIN,
    joinedDepartmentAt: "2023-01-01",
    isActive: true,
    isAdmin: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    fullName: "Regular User",
    email: "user@example.com",
    role: Role.CUSTOMER,
    joinedDepartmentAt: "2023-02-01",
    isActive: true,
    isAdmin: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockTeams: Team[] = [
  {
    id: 1,
    name: "Development Team",
    members: mockUsers
      .filter((user) => ["1", "2"].includes(user.id))
      .map((user) => user.id),
    createdAt: new Date().toISOString(),
  },
];
