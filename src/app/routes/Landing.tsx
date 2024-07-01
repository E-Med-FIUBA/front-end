import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const LandingRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
