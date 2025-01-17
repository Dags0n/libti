import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = (token, userId) => {
    setCookie("access_token", token, { 
      path: '/', 
      maxAge: 3600,
    });
    setCookie("userId", userId, {
      path: '/',
      maxAge: 3600,
    });
    setIsAuthenticated(true);
    setUserId(userId);
  };

  const logout = () => {
    removeCookie("access_token", { path: '/' });
    removeCookie("userId", { path: '/' });
    setIsAuthenticated(false);
    setUserId(null);
  };

  useEffect(() => {
    if (cookies.access_token) {
      setIsAuthenticated(true);
    }
  }, [cookies]);

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
