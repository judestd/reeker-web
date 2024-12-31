// src/api/endpoints/user.ts
import apiClient from '../client';
import type { User, ApiResponse, CreateUserInput } from '../../types/user';

export const userApi = {
  getMe: () => 
    apiClient.get<ApiResponse<User>>('/web/users/me'),
  
  getUsers: (params: { page: number; limit: number }) => 
    apiClient.get<ApiResponse<User[]>>('/web/users', { params }),

  createUser: (data: CreateUserInput) => 
    apiClient.post<ApiResponse<User>>('/web/users', data),
};
