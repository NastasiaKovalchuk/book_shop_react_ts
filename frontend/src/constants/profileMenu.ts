export const MENU = [
  { label: "My profile", path: "/profile" },
  { label: "Orders", path: "/orders" },
  { label: "Logout", path: "/logout" }, // или "/" если Logout просто редирект
] as const;

export type ProfileMenuItem = (typeof MENU)[number];
