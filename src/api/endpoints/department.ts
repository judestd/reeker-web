import { ApiResponse, PaginationParams } from "../../types/common";
import { CreateDepartmentInput, UpdateDepartmentInput } from "../../types/department";
import { Department } from "../../types/department";
import apiClient from "../client";

export const departmentApi = {
  getAll: (params: PaginationParams) =>
    apiClient.get<ApiResponse<Department[]>>(`/department`, { params }),

  create: (data: CreateDepartmentInput) =>
    apiClient.post<ApiResponse<Department>>(`/department`, data),

  update: (id: string, data: UpdateDepartmentInput) =>
    apiClient.put<ApiResponse<Department>>(`/department/${id}`, data),

  updateStatus: (id: string, isActive: boolean) =>
    apiClient.patch<ApiResponse<Department>>(`/department/${id}/status`, {
      isActive,
    }),
}; 