import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";

import "react-toastify/dist/ReactToastify.css";
import "@/app/toaster-styles.css";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        pauseOnFocusLoss
        pauseOnHover
        stacked
      />
    </ThemeProvider>
  );
}
