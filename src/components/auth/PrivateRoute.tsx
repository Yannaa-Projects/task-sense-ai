
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';

interface PrivateRouteProps {
  requiredRole?: UserRole;
}

const PrivateRoute = ({ requiredRole }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, profile } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You could replace this with a loading spinner
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If a specific role is required, check if user has that role
  if (requiredRole && profile?.role !== requiredRole) {
    // Redirect to unauthorized page or home page
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has the required role (if specified)
  return <Outlet />;
};

export default PrivateRoute;
