// src/api/v1/models/response.ts

// Successful response wrapper
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

// Error response wrapper
export interface ApiErrorResponse {
  success: false;
  message: string;
  details?: unknown;
}

// Convenience union type
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Helper factories (optional but nice for controllers)
export function ok<T>(data: T): ApiSuccessResponse<T> {
  return { success: true, data };
}

export function fail(message: string, details?: unknown): ApiErrorResponse {
  return { success: false, message, details };
}
