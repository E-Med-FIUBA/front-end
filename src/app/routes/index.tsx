import { Outlet, createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from '@/lib/auth/protected-route';
import UnprotectedRoute from '@/lib/auth/unprotected-route';

import Root from './app/root';
import ErrorPage from './error-page';
import { NotFoundRoute } from './not-found';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./landing');
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
          path: '/login',
          lazy: async () => {
            const { LoginRoute } = await import('./auth/login');
            return { Component: LoginRoute };
          },
        },
        {
          path: '/register',
          lazy: async () => {
            const { RegisterRoute } = await import('./auth/register');
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
        // {
        //   path: '/dashboard',
        //   element: <Navigate to={'/patients'} replace />,
        // },
        {
          path: '/prescriptions',
          lazy: async () => {
            const { PrescriptionsRoute } = await import('./app/prescriptions');
            return { Component: PrescriptionsRoute };
          },
        },
        {
          lazy: async () => {
            const { PatientsLayout } = await import(
              './app/patients/patients-layout'
            );
            return { Component: PatientsLayout };
          },
          children: [
            {
              path: '/patients/:patientId',
              lazy: async () => {
                const { PatientDetailsRoute } = await import(
                  './app/patients/patient-details'
                );
                return { Component: PatientDetailsRoute };
              },
            },
            {
              path: '/patients',
              lazy: async () => {
                const { NoPatientRoute } = await import(
                  './app/patients/no-patient'
                );
                return { Component: NoPatientRoute };
              },
            },
          ],
        },
        {
          path: '/medicines',
          lazy: async () => {
            const { MedicinesRoute } = await import('./app/medicines');
            return { Component: MedicinesRoute };
          },
        },
        {
          path: '/history',
          lazy: async () => {
            const { HistoryRoute } = await import('./app/history');
            return { Component: HistoryRoute };
          },
        },
        {
          path: '/settings',
          lazy: async () => {
            const { SettingsRoute } = await import('./app/settings');
            return { Component: SettingsRoute };
          },
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundRoute />,
    },
  ]);
