// src/api/endpoints/location.ts
import apiClient from '../client';
import type { ApiResponse } from '../../types/common';

import type { Province, District, Ward } from '../../types/location';

export const locationApi = {
  getProvinces: () =>
    apiClient.get<ApiResponse<Province[]>>('/location/provinces'),

  getDistricts: (provinceCode: string) =>
    apiClient.get<ApiResponse<District[]>>(`/location/districts/${provinceCode}`),

  getWards: (districtCode: string) =>
    apiClient.get<ApiResponse<Ward[]>>(`/location/wards/${districtCode}`)
};
