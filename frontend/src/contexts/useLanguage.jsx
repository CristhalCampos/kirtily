import { useContext } from 'react';
import LanguageContext from './languageContext';

/**
 * @description Use language
 * @returns {JSX.Element}
 */
export const useLanguage = () => {
  return useContext(LanguageContext);
};