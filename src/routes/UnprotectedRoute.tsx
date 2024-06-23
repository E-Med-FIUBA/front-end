import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function UnprotectedRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <Outlet />;
}
