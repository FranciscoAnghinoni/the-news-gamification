import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { AuthenticatedLayout } from "./components/AuthenticatedLayout";
import { AdminRoute } from "./components/AdminRoute";

// Lazy load pages
const AuthPage = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-branco flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amarelo" />
  </div>
);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated at all, redirect to auth page
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" />;
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
