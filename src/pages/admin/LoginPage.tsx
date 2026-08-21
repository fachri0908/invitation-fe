import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { APP_NAME, ROUTE_PATHS } from "@/shared/constants";
import { ApiClientError } from "@/shared/api/apiClient";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    loginMutation.mutate(
      { email, password },
      {
        onError: (error) => {
          if (error instanceof ApiClientError) {
            setErrorMessage(error.message);
          } else {
            setErrorMessage("An unexpected error occurred. Please try again.");
          }
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link to={ROUTE_PATHS.guest.home} className="text-2xl font-bold text-indigo-600">
            {APP_NAME}
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Sign in to your account</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {errorMessage && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            isLoading={loginMutation.isPending}
            className="mt-6 w-full"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
