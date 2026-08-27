import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginRequest, fetchCurrentUserRequest } from "../api/authApi";
import { useAuthStore } from "@/shared/store/authStore";
import { ROUTE_PATHS } from "@/shared/constants/routes";
import { ApiClientError } from "@/shared/api/apiClient";

export function useLogin() {
  const { setCredentials } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { accessToken } = await loginRequest(credentials);
      // Pass the token directly — localStorage isn't written until onSuccess,
      // so the interceptor can't pick it up at this point.
      const user = await fetchCurrentUserRequest(accessToken);
      return { accessToken, user };
    },
    onSuccess: ({ accessToken, user }) => {
      setCredentials(user, accessToken);
      navigate(ROUTE_PATHS.admin.dashboard);
    },
    onError: (error: ApiClientError) => {
      console.error("Login failed:", error.message);
    },
  });
}
