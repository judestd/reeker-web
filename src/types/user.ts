// src/types/user.ts
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

export interface PaginationMetadata {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface ApiResponse<T> {
  code: string;
  success: boolean;
  data: T;
  error: null | string;
  metadata: {
    timestamp: string;
    pagination: PaginationMetadata;
  };
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  pwd: string;
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
