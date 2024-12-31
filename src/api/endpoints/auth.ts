import { AxiosResponse } from 'axios';
import apiClient from '../client';
import { User } from '../../types/user';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => 
    apiClient.post('/web/auth/login', credentials),
};