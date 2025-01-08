import { ApiResponse, PaginationParams } from "../../types/common";
import { CreateDepartmentInput, UpdateDepartmentInput } from "../../types/department";
import { Department } from "../../types/department";
import apiClient from "../client";
import { API_VERSION } from "../config";

export const departmentApi = {
  getAll: (params: PaginationParams) =>
    apiClient.get<ApiResponse<Department[]>>(`${API_VERSION}/web/department`, { params }),

  create: (data: CreateDepartmentInput) =>
    apiClient.post<ApiResponse<Department>>(`${API_VERSION}/web/department`, data),

  update: (id: string, data: UpdateDepartmentInput) =>
    apiClient.put<ApiResponse<Department>>(`${API_VERSION}/web/department/${id}`, data),

  updateStatus: (id: string, isActive: boolean) =>
    apiClient.patch<ApiResponse<Department>>(`${API_VERSION}/web/department/${id}/status`, {
      isActive,
    }),
}; 