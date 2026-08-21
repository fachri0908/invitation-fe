import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/shared/store/authStore";
import { ROUTE_PATHS } from "@/shared/constants/routes";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.auth.login} replace />;
  }

  return <>{children}</>;
}
