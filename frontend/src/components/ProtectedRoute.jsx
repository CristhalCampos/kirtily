import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import propTypes from "prop-types";

const ProtectedRoute = ({ children, roles }) => {
  const { accessToken, role } = useAuth();

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  if (!roles.includes(role)) {
    return <Navigate to="/unauthorized"  />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
  roles: propTypes.arrayOf(propTypes.string).isRequired,
};

export default ProtectedRoute;