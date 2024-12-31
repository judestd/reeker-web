import { AxiosResponse } from 'axios';
import apiClient from '../client';
import { API_VERSION } from '../config';

interface LoginCredentials {
  email: string;
  password: string;
  isAdmin: boolean;
}

interface AuthResponse {
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  }
}

export const authApi = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => 
    apiClient.post(`${API_VERSION}/web/auth/login`, credentials),
};