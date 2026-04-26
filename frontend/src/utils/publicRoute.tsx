import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const PublicRoute = () => {
  const { token, role } = useAuthStore();

  if (!token) return <Outlet />;

  // redirect based on role
  if (role === "ADMIN") return <Navigate to="/admin/ecommerce" replace />;
  return <Navigate to="/user/ecommerce" replace />;
};