import {
  ApiResponse,
  PaginationParams,
} from "../../types/common";
import {
  CreateRealEstateSourceInput,
  RealEstateSource,
  UpdateRealEstateSourceInput,
} from "../../types/realEstateSource";
import apiClient from "../client";

export const realEstateSourceApi = {
  getAll: (params: PaginationParams) =>
    apiClient.get<ApiResponse<RealEstateSource[]>>(`/real-estate-source`, {
      params,
    }),

  create: (data: CreateRealEstateSourceInput) =>
    apiClient.post<ApiResponse<RealEstateSource>>(`/real-estate-source`, data),

  update: (id: string, data: UpdateRealEstateSourceInput) =>
    apiClient.put<ApiResponse<RealEstateSource>>(
      `/real-estate-source/${id}`,
      data,
    ),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/real-estate-source/${id}`),
};
