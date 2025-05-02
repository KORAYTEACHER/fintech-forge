import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const location = useLocation();

  if (loading) {
    return null;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
