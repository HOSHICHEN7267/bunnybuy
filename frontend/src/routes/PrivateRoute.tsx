// src/routes/PrivateRoute.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token, loading } = useAuth();
  if (loading) return <div>載入中...</div>; // 或自訂 loading 畫面
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
