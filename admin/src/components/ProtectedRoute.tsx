import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute — redirects to /login if no admin_token is present.
 * Wrap any route that requires authentication with this component.
 */
export default function ProtectedRoute() {
  const token = localStorage.getItem('admin_token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
