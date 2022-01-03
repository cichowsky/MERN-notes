import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from 'context/AuthContext';

import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const isAuthenticated = user;

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default PrivateRoute;
