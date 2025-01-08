import { ApiResponse, PaginationParams } from "../../types/common";
import { Tag } from "../../types/tag";
import apiClient from "../client";
import { API_VERSION } from "../config";

export const tagApi = {
  getAll: (params: PaginationParams) =>
    apiClient.get<ApiResponse<Tag[]>>(`${API_VERSION}/web/tag`, { params }),

  create: (data: { name: string }) =>
    apiClient.post<ApiResponse<Tag>>(`${API_VERSION}/web/tag`, data),

  update: (id: string, data: { name: string }) =>
    apiClient.put<ApiResponse<Tag>>(`${API_VERSION}/web/tag/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`${API_VERSION}/web/tag/${id}`),
}; 