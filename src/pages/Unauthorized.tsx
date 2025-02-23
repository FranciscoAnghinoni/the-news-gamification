import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-marrom flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-branco p-8 rounded-lg shadow-xl text-center">
        <div className="text-amarelo w-16 h-16 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-3xl font-bold text-marrom">
          Acesso Não Autorizado
        </h2>
        <p className="mt-2 text-sm text-cinza">
          Você não tem permissão para acessar esta página.
        </p>
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-marrom bg-amarelo hover:bg-amarelo/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amarelo"
          >
            Voltar para Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
