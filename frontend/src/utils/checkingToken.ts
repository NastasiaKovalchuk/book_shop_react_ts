import { useAuthStore } from "../store/auth.store";

export const getValidToken = async (): Promise<string | null> => {
  const { accessToken, refreshAccessToken } = useAuthStore.getState();

  if (!accessToken) return null;

  // Декодируем токен
  const decodeJWT = (token: string) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  const isTokenValid = (token: string) => {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  };

  if (isTokenValid(accessToken)) return accessToken;

  // Токен просрочен → вызываем метод из store
  try {
    console.log("Токен просрочен");
    await refreshAccessToken();
    const newToken = useAuthStore.getState().accessToken;
    return newToken;
  } catch {
    return null; // не удалось обновить
  }
};
