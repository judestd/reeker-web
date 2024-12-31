// src/api/endpoints/user.ts
import apiClient from '../client';
import type { User, CreateUserInput } from '../../types/user';
import { ApiResponse } from '../../types/common';
import { API_VERSION } from '../config';

export const userApi = {
  getMe: () =>
    apiClient.get<ApiResponse<User>>(`${API_VERSION}/web/users/me`),

  getUsers: (params: { page: number; limit: number }) =>
    apiClient.get<ApiResponse<User[]>>(`${API_VERSION}/web/users`, { params }),

  createUser: (data: CreateUserInput) =>
    apiClient.post<ApiResponse<User>>(`${API_VERSION}/web/users`, data),
};
