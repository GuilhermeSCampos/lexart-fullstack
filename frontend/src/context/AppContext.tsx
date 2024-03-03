import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string) => Promise<boolean>;
}

// Criar um contexto com um valor inicial vazio ({} as AuthContextProps)
const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

const BASE_URL = import.meta.env.VITE_API_URL;

// Provedor do contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    localStorage.setItem("token", JSON.stringify({ token: data.token }));

    setLoggedIn(true);
    return true;
  };

  const logout = () => {
    // Lógica de logout
    setLoggedIn(false);
  };

  const register = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return false;
    }
    return true;
  };

  const fetchPhones = () => {
    const token = JSON.parse(localStorage.getItem("token") || "{}").token;
    fetch(`${BASE_URL}/phones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
