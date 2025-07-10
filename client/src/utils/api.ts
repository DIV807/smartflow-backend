import { apiRequest } from "@/lib/queryClient";
import type { LoginData, SignupData } from "@shared/schema";

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiRequest("POST", "/api/auth/login", data);
    return response.json();
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await apiRequest("POST", "/api/auth/signup", data);
    return response.json();
  },

  logout: async (): Promise<void> => {
    await apiRequest("POST", "/api/auth/logout");
  },

  me: async (): Promise<AuthResponse> => {
    const response = await apiRequest("GET", "/api/auth/me");
    return response.json();
  },
};
