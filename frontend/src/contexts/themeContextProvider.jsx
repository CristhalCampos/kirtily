import { useState } from "react";
import ThemeContext from "./themeContext";
import propTypes from "prop-types";

/**
 * @description Theme context provider
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 */
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};