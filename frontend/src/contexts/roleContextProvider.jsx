import { useState } from "react";
import RoleContext from "./roleContext";
import propTypes from "prop-types";

export const RoleContextProvider = ({ children }) => {
  const [role, setRole] = useState('user');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

RoleContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};