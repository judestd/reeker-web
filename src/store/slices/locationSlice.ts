// src/store/slices/locationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Province, District, Ward } from '../../types/location';

interface LocationState {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  provinces: [],
  districts: [],
  wards: [],
  loading: false,
  error: null
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setProvinces: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },
    setDistricts: (state, action: PayloadAction<District[]>) => {
      state.districts = action.payload;
    },
    setWards: (state, action: PayloadAction<Ward[]>) => {
      state.wards = action.payload;
    },
    clearDistricts: (state) => {
      state.districts = [];
      state.wards = [];
    },
    clearWards: (state) => {
      state.wards = [];
    }
  }
});

export const { 
  setProvinces, 
  setDistricts, 
  setWards,
  clearDistricts,
  clearWards
} = locationSlice.actions;

export default locationSlice.reducer;
