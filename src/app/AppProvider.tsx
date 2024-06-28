import { AuthProvider } from "@/lib/auth";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  );
}