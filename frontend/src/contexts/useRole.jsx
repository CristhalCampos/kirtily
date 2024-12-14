import { useContext } from 'react';
import RoleContext from './roleContext';

export const useRole = () => {
  return useContext(RoleContext);
};