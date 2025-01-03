export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface PaginationMetadata {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface ApiResponse<T> {
  code: string;
  success: boolean;
  data: T;
  error: null | string;
  metadata: {
    timestamp: string;
    pagination: PaginationMetadata;
  };
}

export interface ApiDataResponse<T> {
  code: string;
  success: boolean;
  data: {
    data: T;
    pagination: PaginationMetadata;
  };
  error: null | string;
  metadata: {
    timestamp: string;
  };
}
