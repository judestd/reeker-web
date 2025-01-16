import {
  ApiResponse,
  PaginationParams,
} from "../../types/common";
import { CreateRealEstateAreaInput, UpdateRealEstateAreaInput } from "../../types/realEstateArea";
import { RealEstateArea } from "../../types/realEstateArea";
import apiClient from "../client";
import { API_VERSION } from "../config";

export const realEstateAreaApi = {
  getAll: (params: PaginationParams) =>
    apiClient.get<ApiResponse<RealEstateArea[]>>(`${API_VERSION}/web/real-estate-area`, {
      params,
    }),

  create: (data: CreateRealEstateAreaInput) =>
    apiClient.post<ApiResponse<RealEstateArea>>(`${API_VERSION}/web/real-estate-area`, data),

  update: (id: string, data: UpdateRealEstateAreaInput) =>
    apiClient.put<ApiResponse<RealEstateArea>>(
      `${API_VERSION}/web/real-estate-area/${id}`,
      data,
    ),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`${API_VERSION}/web/real-estate-area/${id}`),
}; 