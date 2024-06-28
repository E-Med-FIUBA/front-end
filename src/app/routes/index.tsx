import { Outlet, createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import Root from "./app/Root";
import ErrorPage from "./ErrorPage";
import UnprotectedRoute from "@/lib/auth/UnprotectedRoute";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { LandingRoute } = await import("./Landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: "/auth",
      element: (
        <UnprotectedRoute>
          <Outlet />
        </UnprotectedRoute>
      ),
      children: [
        {
          path: "/auth/login",
          lazy: async () => {
            const { LoginRoute } = await import("./auth/Login");
            return { Component: LoginRoute };
          },
        },
      ],
    },
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/app/dashboard",
          lazy: async () => {
            const { DashboardRoute } = await import("./app/Dashboard");
            return { Component: DashboardRoute };
          },
        },
        {
          path: "/app/prescriptions",
          lazy: async () => {
            const { PrescriptionsRoute } = await import("./app/Prescriptions");
            return { Component: PrescriptionsRoute };
          },
        },
      ],
    },
  ]);
