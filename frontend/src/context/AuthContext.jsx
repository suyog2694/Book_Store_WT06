import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!currentUser;

  // Check existing login when app starts
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const restoreUser = async () => {
      try {
        const data = await getCurrentUser();

        if (data.success) {
          setCurrentUser(data.user);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        localStorage.removeItem("token");
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  // Login
  const login = async (email, password) => {
    const data = await loginUser(email, password);

    if (data.success) {
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user);
    }

    return data;
  };

  // Register
  const register = async (name, email, password) => {
    const data = await registerUser(name, email, password);

    if (data.success) {
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user);
    }

    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};