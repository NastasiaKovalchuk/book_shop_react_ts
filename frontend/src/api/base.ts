import { useAuthStore } from "../store/auth.store";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const { accessToken, refreshAccessToken, logout } = useAuthStore.getState();

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const config = {
    ...options,
    headers,
  };

  let response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken();

      if (newToken) {
        headers.set("Authorization", `Bearer ${newToken}`);
        response = await fetch(`${BASE_URL}${endpoint}`, {
          ...options,
          headers,
        });
      }
    } catch (err) {
      logout();
      return Promise.reject("Session expired");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw { status: response.status, ...errorData };
  }

  return response.json();
}
