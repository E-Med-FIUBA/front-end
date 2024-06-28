import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";

export default function Header() {
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <p>Loading</p>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
}
