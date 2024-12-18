import { useState, useEffect } from "react";
import AuthContext from "./authContext";
import { refreshToken } from "../services/authService";
import propTypes from "prop-types";

/**
 * @description Auth context provider
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 */
export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await refreshToken();
        setAccessToken(token);
        setRole(JSON.parse(localStorage.getItem("role")));
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
    };

    if (!accessToken) {
      initializeAuth();
    }
  }, [accessToken]);
  
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};