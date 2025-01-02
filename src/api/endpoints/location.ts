// src/api/endpoints/location.ts
import apiClient from '../client';
import type { ApiResponse } from '../../types/common';

import type { Province, District, Ward } from '../../types/location';

export const locationApi = {
  getAllProvinces: () =>
    apiClient.get<ApiResponse<Province[]>>('/location/provinces'),

  getAllDistricts: () =>
    apiClient.get<ApiResponse<District[]>>('/location/districts'),

  getAllWards: () =>
    apiClient.get<ApiResponse<Ward[]>>('/location/wards'),

  getDistrictsByProvinceCode: (provinceCode: string) =>
    apiClient.get<ApiResponse<District[]>>(`/location/districts/${provinceCode}`),

  getWardsByDistrictCode: (districtCode: string) =>
    apiClient.get<ApiResponse<Ward[]>>(`/location/wards/${districtCode}`)
};
