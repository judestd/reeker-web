import { AxiosResponse } from "axios";
import apiClient from "../client";
import { User } from "../../types/user";

export const membersApi = {
  getAll: (): Promise<AxiosResponse<User[]>> => apiClient.get("/members"),

  getById: (id: string): Promise<AxiosResponse<User>> =>
    apiClient.get(`/members/${id}`),

  update: (id: string, data: Partial<User>): Promise<AxiosResponse<User>> =>
    apiClient.put(`/members/${id}`, data),
};
