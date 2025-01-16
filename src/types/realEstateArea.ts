export interface Area {
  province_code: string;
  district_code?: string;
  ward_code?: string;
  provinceName?: string;
  districtName?: string;
  wardName?: string;
}

export interface RealEstateArea {
  _id: string;
  name: string;
  area: Area[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRealEstateAreaInput {
  name: string;
  area: Omit<Area, "provinceName" | "districtName" | "wardName">[];
}

export interface UpdateRealEstateAreaInput {
  name?: string;
  area?: Omit<Area, "provinceName" | "districtName" | "wardName">[];
} 