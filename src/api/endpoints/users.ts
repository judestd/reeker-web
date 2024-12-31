import { AxiosResponse } from 'axios';
import apiClient from '../client';
import { User, UserCreateInput, UserUpdateInput } from '../../types/user';
import { PaginatedResponse, PaginationParams } from '../../types/common';

export const usersApi = {
  getAll: (params: PaginationParams & { search?: string, status?: boolean, role?: string }): Promise<AxiosResponse<PaginatedResponse<User>>> => 
    apiClient.get('/users', { params }),
    
  create: (data: UserCreateInput): Promise<AxiosResponse<User>> => 
    apiClient.post('/users', data),
    
  update: (id: string, data: UserUpdateInput): Promise<AxiosResponse<User>> => 
    apiClient.put(`/users/${id}`, data),
    
  delete: (id: string): Promise<AxiosResponse<void>> => 
    apiClient.delete(`/users/${id}`),
};