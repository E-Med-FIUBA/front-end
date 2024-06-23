import { AuthProvider } from "@/hooks";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}
