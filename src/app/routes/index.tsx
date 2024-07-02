import { Outlet, createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import Root from "./app/Root";
import ErrorPage from "./ErrorPage";
import UnprotectedRoute from "@/lib/auth/UnprotectedRoute";
import { NotFoundRoute } from "./NotFound";

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
      element: (
        <UnprotectedRoute>
          <Outlet />
        </UnprotectedRoute>
      ),
      children: [
        {
          path: "/login",
          lazy: async () => {
            const { LoginRoute } = await import("./auth/Login");
            return { Component: LoginRoute };
          },
        },
        {
          path: "/register",
          lazy: async () => {
            const { RegisterRoute } = await import("./auth/Register");
            return { Component: RegisterRoute };
          },
        },
      ],
    },
    {
      element: (
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/dashboard",
          lazy: async () => {
            const { DashboardRoute } = await import("./app/Dashboard");
            return { Component: DashboardRoute };
          },
        },
        {
          path: "/prescriptions",
          lazy: async () => {
            const { PrescriptionsRoute } = await import("./app/Prescriptions");
            return { Component: PrescriptionsRoute };
          },
        },
        {
          lazy: async () => {
            const { PatientsLayout } = await import(
              "./app/patients/PatientsLayout"
            );
            return { Component: PatientsLayout };
          },
          children: [
            {
              path: "/patients/:id",
              lazy: async () => {
                const { PatientDetailsRoute } = await import(
                  "./app/patients/PatientDetails"
                );
                return { Component: PatientDetailsRoute };
              },
            },
            {
              path: "/patients",
              lazy: async () => {
                const { NoPatientRoute } = await import(
                  "./app/patients/NoPatient"
                );
                return { Component: NoPatientRoute };
              },
            },
          ],
        },
        {
          path: "/medicines",
          lazy: async () => {
            const { PrescriptionsRoute } = await import("./app/Prescriptions");
            return { Component: PrescriptionsRoute };
          },
        },
        {
          path: "/history",
          lazy: async () => {
            const { PrescriptionsRoute } = await import("./app/Prescriptions");
            return { Component: PrescriptionsRoute };
          },
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundRoute />,
    },
  ]);
