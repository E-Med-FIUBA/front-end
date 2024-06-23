import { Outlet, useNavigate } from "react-router-dom";

export default function UnprotectedRoute() {
  //   const { isAuthenticated } = useAuth();
  const isAuthenticated = false;
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/dashboard", { replace: true });
  }

  return <Outlet />;
}
