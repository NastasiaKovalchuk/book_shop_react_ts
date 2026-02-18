export interface CheckEmailResponse {
  exists: boolean;
}

export interface AuthResponse {
  user: { id: string; email: string };
  token: string;
}

export const checkEmail = async (
  email: string,
): Promise<CheckEmailResponse> => {
  const res = await fetch(
    "https://book-shop-react-ts.onrender.com/auth/check-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Authentication failed");
  }

  return res.json();
};

export const getJwtToken = async (email: string, password: string) => {
  const res = await fetch(
    "https://book-shop-react-ts.onrender.com/auth/authenticate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res;
};

export const refreshToken = async (refreshToken: string) => {
  const res = await fetch(
    "https://book-shop-react-ts.onrender.com/auth/refresh",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    },
  );
  if (!res.ok) throw new Error("Refresh failed");
  return res.json();
};
