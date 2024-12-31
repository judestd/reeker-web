// src/types/user.ts
export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  OWNER = 'owner', // Đầu chủ
  OWNER_MANAGER = 'owner_manager', // Quản lý đầu chủ
  CUSTOMER = 'customer', // Đầu khách
  CUSTOMER_MANAGER = 'customer_manager', // Quản lý đầu khách
}

export const Name_Role = {
  [Role.SUPER_ADMIN]: 'Super Admin',
  [Role.ADMIN]: 'Admin',
  [Role.OWNER]: 'Đầu chủ',
  [Role.OWNER_MANAGER]: 'Quản lý đầu chủ',
  [Role.CUSTOMER]: 'Đầu khách',
  [Role.CUSTOMER_MANAGER]: 'Quản lý đầu khách',
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  isAdmin: boolean;
  social?: {
    facebook?: string;
    zalo?: string;
  };
  ward?: string;
  district?: string;
  province?: string;
  addressDetail?: string;
  gender?: string;
  birthday?: string;
  joinedDepartmentAt?: string;
  isActive: boolean;
  deactivatedAt?: string;
  deviceId?: string;
  deviceToken?: string;
  lastUsedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  social?: {
    facebook?: string;
    zalo?: string;
  };
  ward?: string;
  district?: string;
  province?: string;
  addressDetail?: string;
  gender?: string;
  birthday?: string;
  joinedDepartmentAt?: string;
  joinedDepartmentBy?: string;
}
