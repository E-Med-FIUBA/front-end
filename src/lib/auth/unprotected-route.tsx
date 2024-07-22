import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

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
