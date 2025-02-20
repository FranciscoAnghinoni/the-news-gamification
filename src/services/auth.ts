import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    is_admin: number;
  };
}

export interface AuthCredentials {
  email: string;
  password: string;
}

const errorMessages: Record<string, string> = {
  "You need to subscribe to the newsletter before registering":
    "Você precisa se inscrever na newsletter antes de se registrar",
};

const getTranslatedError = (message: string) =>
  errorMessages[message] || message;

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    // Check for error message in different possible locations
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.response?.data;

    return typeof message === "string"
      ? getTranslatedError(message)
      : "Erro ao autenticar. Por favor, tente novamente.";
  }
  return "Erro ao autenticar. Por favor, tente novamente.";
};

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async register(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async changePassword(
    currentPassword: string,
    newPassword: string,
    token: string
  ): Promise<{ success: boolean }> {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
