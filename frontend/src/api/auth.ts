import { apiRequest } from "./base";

export interface CheckEmailResponse {
  exists: boolean;
}

export interface AuthResponse {
  user: { id: string; email: string };
  accessToken: string;
  refreshToken: string;
}

export const checkEmail = async (
  email: string,
): Promise<CheckEmailResponse> => {
  return apiRequest("/auth/check-email", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const getJwtToken = async (email: string, password: string) => {
  return apiRequest("/auth/authenticate", {
    method: "POST",
    credentials: "include", // важно для работы с Refresh куками
    body: JSON.stringify({ email, password }),
  });
};

export const logout = async () => {
  return apiRequest("/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const refreshToken = async () => {
  console.log("API refreshAccessToken");
  const BASE_URL = import.meta.env.PROD
    ? "https://book-shop-react-ts.onrender.com"
    : "http://localhost:4000";

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Refresh failed");
  return res.json();
};
