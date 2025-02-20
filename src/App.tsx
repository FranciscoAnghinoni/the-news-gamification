import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthPage } from "./pages/Auth";
import { useAuth } from "./hooks/useAuth";
import { Dashboard } from "./pages/Dashboard";
import { Admin } from "./pages/Admin";
import { Unauthorized } from "./pages/Unauthorized";
import { AuthenticatedLayout } from "./components/AuthenticatedLayout";
import { AdminRoute } from "./components/AdminRoute";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, token } = useAuth();


  // If not authenticated at all, redirect to auth page
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" />;
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}

function App() {
  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
}

export default App;
