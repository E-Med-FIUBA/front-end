import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  ProtectedRoute,
  Dashboard,
  UnprotectedRoute,
  Login,
  Root,
  Header,
  ErrorPage,
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

export default router;
