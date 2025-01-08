import { ApiResponse, PaginationParams } from "../../types/common";
import { RealEstateType } from "../../types/realEstateType";
import apiClient from "../client";
import { API_VERSION } from "../config";

export const realEstateTypeApi = {
  getAll: (params: PaginationParams) =>
    apiClient.get<ApiResponse<RealEstateType[]>>(`${API_VERSION}/web/real-estate-type`, { params }),

  create: (data: { name: string }) =>
    apiClient.post<ApiResponse<RealEstateType>>(`${API_VERSION}/web/real-estate-type`, data),

  update: (id: string, data: { name: string }) =>
    apiClient.put<ApiResponse<RealEstateType>>(`${API_VERSION}/web/real-estate-type/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`${API_VERSION}/web/real-estate-type/${id}`),
}; 