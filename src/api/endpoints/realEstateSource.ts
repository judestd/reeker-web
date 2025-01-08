import {
  ApiResponse,
  PaginationParams,
} from "../../types/common";
import { CreateRealEstateSourceInput, UpdateRealEstateSourceInput } from "../../types/realEstateSource";
import { RealEstateSource } from "../../types/realEstateSource";
import apiClient from "../client";
import { API_VERSION } from "../config";

export const realEstateSourceApi = {
  getAll: (params: PaginationParams) =>
    apiClient.get<ApiResponse<RealEstateSource[]>>(`${API_VERSION}/web/real-estate-source`, {
      params,
    }),

  create: (data: CreateRealEstateSourceInput) =>
    apiClient.post<ApiResponse<RealEstateSource>>(`${API_VERSION}/web/real-estate-source`, data),

  update: (id: string, data: UpdateRealEstateSourceInput) =>
    apiClient.put<ApiResponse<RealEstateSource>>(
      `${API_VERSION}/web/real-estate-source/${id}`,
      data,
    ),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`${API_VERSION}/web/real-estate-source/${id}`),
};
