export interface RealEstateSource {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRealEstateSourceInput {
  name: string;
  description?: string;
}

export interface UpdateRealEstateSourceInput {
  name?: string;
  description?: string;
}
