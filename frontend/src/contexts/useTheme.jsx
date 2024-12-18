import { useContext } from 'react';
import ThemeContext from './themeContext';

/**
 * @description Use theme
 * @returns {JSX.Element}
 */
export const useTheme = () => {
  return useContext(ThemeContext);
};