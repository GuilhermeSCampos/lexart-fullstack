import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Phone } from "../types/phone";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string) => Promise<boolean>;
  fetchPhones: () => Promise<Phone[]>;
  username: string;
  validateToken: () => void;
  registerPhone: (
    name: string,
    brand: string,
    model: string,
    price: number,
    color: string
  ) => Promise<boolean>;
  removePhone: (id: number) => Promise<void>;
  editPhone: (phone: Phone) => Promise<boolean>;
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
  const [username, setUsername] = useState("" as string);

  const navigate = useNavigate();

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

    localStorage.setItem("token", JSON.stringify(data.token));

    setUsername(username);
    setLoggedIn(true);
    return true;
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

    return login(username, password);
  };

  const fetchPhones = async () => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString) : "";

    const response = await fetch(`${BASE_URL}/phones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setLoggedIn(false);
      localStorage.clear();
      navigate("/login");
    }

    const data = await response.json();
    return data as Phone[];
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  const validateToken = async () => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString) : "";

    const response = await fetch(`${BASE_URL}/auth/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      navigate("/login");
    }

    const data = await response.json();
    setUsername(data.data.username);
  };

  const registerPhone = async (
    name: string,
    brand: string,
    model: string,
    price: number,
    color: string
  ) => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString) : "";

    const response = await fetch(`${BASE_URL}/phones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, brand, model, price, color }),
    });

    if (!response.ok) {
      return false;
    }
    return true;
  };

  const removePhone = async (id: number) => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString) : "";

    await fetch(`${BASE_URL}/phones/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const editPhone = async (phone: Phone) => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString) : "";

    const response = await fetch(`${BASE_URL}/phones/${phone.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: phone.name,
        brand: phone.brand,
        model: phone.model,
        price: phone.price,
        color: phone.color,
      }),
    });

    if (!response.ok) {
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        register,
        fetchPhones,
        username,
        validateToken,
        registerPhone,
        removePhone,
        editPhone,
      }}
    >
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
