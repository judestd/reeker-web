// src/api/endpoints/location.ts
import apiClient from "../client";
import type { ApiResponse } from "../../types/common";

import type { Province, District, Ward } from "../../types/location";
import { API_VERSION } from "../config";

export const locationApi = {
  getAllProvinces: () =>
    apiClient.get<ApiResponse<Province[]>>(`${API_VERSION}/location/provinces`),

  getAllDistricts: () =>
    apiClient.get<ApiResponse<District[]>>(`${API_VERSION}/location/districts`),

  getAllWards: () => apiClient.get<ApiResponse<Ward[]>>(`${API_VERSION}/location/wards`),

  getDistrictsByProvinceCode: (provinceCode: string) =>
    apiClient.get<ApiResponse<District[]>>(
      `${API_VERSION}/location/districts/${provinceCode}`,
    ),

  getWardsByDistrictCode: (districtCode: string) =>
    apiClient.get<ApiResponse<Ward[]>>(`${API_VERSION}/location/wards/${districtCode}`),
};
