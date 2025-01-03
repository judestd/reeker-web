// src/types/location.ts
export interface Province {
  _id: string;
  type: string;
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  administrativeUnitId: number;
  administrativeRegionId: number;
}

export interface District extends Omit<Province, "administrativeRegionId"> {
  provinceCode: string;
}

export interface Ward extends District {
  districtCode: string;
}

export type LocationType = Province | District | Ward;
