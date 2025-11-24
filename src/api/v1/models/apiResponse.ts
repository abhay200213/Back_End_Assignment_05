// src/api/v1/models/apiResponse.ts

export type ApiStatus = "success" | "error";

export interface ApiResponse<T> {
  status: ApiStatus;
  data?: T;
  message?: string;
  errors?: string[];
}
