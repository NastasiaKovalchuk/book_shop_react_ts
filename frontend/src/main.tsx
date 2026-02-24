import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import { PageWrapper } from "./components/PageWrapper";
import Home from "./components/Main/HomePage";
import { ProfilePage } from "./components/User/ProfilePage";
import { CartPage } from "./components/User/CartPage";
import { OrdersPage } from "./components/User/OrdersPage";
import { CategoryPage } from "./components/Header/Category/CategoryPage";
import { BookPage } from "./components/Books/BookPage";

const router = createBrowserRouter([
  {
    element: <PageWrapper />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/orders", element: <OrdersPage /> },
      { path: "/category/:category", element: <CategoryPage /> },
      { path: "/book/:id", element: <BookPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
