import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token) => {
    setCookie("access_token", token, { 
      path: '/', 
      maxAge: 3600,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeCookie("access_token", { path: '/' });
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (cookies.access_token) {
      setIsAuthenticated(true);
    }
  }, [cookies]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
