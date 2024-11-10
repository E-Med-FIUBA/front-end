import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

export const LandingRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/patients" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
