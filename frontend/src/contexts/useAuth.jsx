import { useContext } from 'react';
import AuthContext from './authContext';

/**
 * @description Use auth
 * @returns {JSX.Element}
 */
export const useAuth = () => {
  return useContext(AuthContext);
};