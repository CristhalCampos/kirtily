import { useState, useEffect } from "react";
import LanguageContext from "./languageContext";
import propTypes from "prop-types";

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  // Load language saved in localStorage
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error("Error retrieving language from localStorage:", error);
    }
  }, []);

  // Save language in localStorage every time you change
  useEffect(() => {
    try {
      localStorage.setItem("language", language);
    } catch (error) {
      console.error("Error saving language to localStorage:", error);
    }
  }, [language]);

  // Change language
  const changeLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "es" ? "en" : "es"));
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};