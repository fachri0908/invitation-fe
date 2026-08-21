import axios from "axios";
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL, ACCESS_TOKEN_KEY } from "@/shared/constants/app";
import type { ApiErrorResponse } from "@/shared/types";

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly errors?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errors = errors;
  }
}

function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: `${API_BASE_URL}/v1`,
    headers: { "Content-Type": "application/json" },
    timeout: 10_000,
  });

  // Attach access token to every request
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Normalise error responses
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorResponse>) => {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? "An unexpected error occurred";
      const errors = error.response?.data?.errors;
      return Promise.reject(new ApiClientError(status, message, errors));
    }
  );

  return instance;
}

export const apiClient = createApiClient();
