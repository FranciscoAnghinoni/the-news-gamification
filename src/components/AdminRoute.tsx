import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthenticatedLayout } from "./AuthenticatedLayout";

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  if (user?.is_admin !== 1) {
    return <Navigate to="/unauthorized" />;
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
