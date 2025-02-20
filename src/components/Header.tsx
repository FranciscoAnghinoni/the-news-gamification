import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <header className="bg-marrom text-branco shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Coffee cup icon */}
            <div className="text-amarelo w-8 h-8 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4c-3.5 0-6.5 1-8 3v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7c-1.5-2-4.5-3-8-3zm-8 8v5c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8h2c1.1 0 2 .9 2 2v2"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold">The News</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-amarelo text-marrom px-4 py-2 rounded-md text-sm font-medium hover:bg-amarelo/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amarelo"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
