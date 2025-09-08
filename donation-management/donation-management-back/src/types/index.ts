export * from './database';
export * from './api';
export * from './errors';
export * from './auth';

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
}

export interface PaginatedSuccessResponse<T = any> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type ApiResponse<T = any> = SuccessResponse<T> | import('./errors').ApiErrorResponse;
export type ApiPaginatedResponse<T = any> = PaginatedSuccessResponse<T> | import('./errors').ApiErrorResponse;