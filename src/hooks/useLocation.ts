// src/hooks/useLocation.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import { locationApi } from '../api/endpoints/location';
import { 
  setProvinces, 
  setDistricts, 
  setWards,
  clearDistricts,
  clearWards 
} from '../store/slices/locationSlice';
import type { RootState } from '../store';

export const useLocation = () => {
  const dispatch = useDispatch();
  const { provinces, districts, wards } = useSelector(
    (state: RootState) => state.location
  );

  const fetchProvinces = async () => {
    try {
      const response = await locationApi.getProvinces();
      dispatch(setProvinces(response.data.data));
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch provinces'
      });
    }
  };

  const fetchDistricts = async (provinceCode: string) => {
    try {
      const response = await locationApi.getDistricts(provinceCode);
      dispatch(setDistricts(response.data.data));
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch districts'
      });
    }
  };

  const fetchWards = async (districtCode: string) => {
    try {
      const response = await locationApi.getWards(districtCode);
      dispatch(setWards(response.data.data));
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch wards'
      });
    }
  };

  const handleProvinceChange = (provinceCode: string) => {
    dispatch(clearDistricts());
    if (provinceCode) {
      fetchDistricts(provinceCode);
    }
  };

  const handleDistrictChange = (districtCode: string) => {
    dispatch(clearWards());
    if (districtCode) {
      fetchWards(districtCode);
    }
  };

  // Fetch provinces on mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  return {
    provinces,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange
  };
};
