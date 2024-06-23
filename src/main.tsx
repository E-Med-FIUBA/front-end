import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import {
  ProtectedRoute,
  Dashboard,
  UnprotectedRoute,
  Login,
  Root,
  Header,
} from "./routes";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Header />,
            children: [
              {
                path: "/dashboard",
                element: <Dashboard />,
              },
            ],
          },
        ],
      },
      {
        element: <UnprotectedRoute />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
