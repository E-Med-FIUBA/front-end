import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function UnprotectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
