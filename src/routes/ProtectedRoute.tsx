import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  //   const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = false;
  
  if (!isAuthenticated) {
    navigate("/login", { replace: true });
  }

  return <Outlet />;
}
