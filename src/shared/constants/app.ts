export const APP_NAME = import.meta.env.VITE_APP_NAME ?? "EventInvite";

// In development Vite proxies /api/* → http://localhost:4000/api/*
// so we always use a relative path — no CORS, no hardcoded host.
export const API_BASE_URL = "/api";

export const ACCESS_TOKEN_KEY = "access_token";
