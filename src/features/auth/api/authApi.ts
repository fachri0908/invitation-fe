import { apiClient } from "@/shared/api/apiClient";
import type { ApiSuccessResponse } from "@/shared/types/api.types";
import type { User } from "@/shared/types/user.types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
}

export async function loginRequest(credentials: LoginCredentials): Promise<AuthTokens> {
  const response = await apiClient.post<ApiSuccessResponse<AuthTokens>>(
    "/auth/login",
    credentials
  );
  return response.data.data;
}

export async function fetchCurrentUserRequest(accessToken: string): Promise<User> {
  const response = await apiClient.get<ApiSuccessResponse<User>>("/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data.data;
}
