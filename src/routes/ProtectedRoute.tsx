import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return <Outlet />;
}
