import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from 'axiosInstance';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(null);

  const registerUser = async (userData) => {
    let data;
    let err;

    try {
      const res = await api.post('/user/register', userData);
      data = res.data;
    } catch (error) {
      err = error.response.data.message;
    }

    return [data, err];
  };

  const loginUser = async (userData) => {
    let data;
    let err;

    try {
      const res = await api.post('/user/login', userData);
      data = res.data;
      setAuthTokens(data);

      const decodedPayload = jwt_decode(data.accessToken);
      setUser(decodedPayload.user_id);
    } catch (error) {
      err = error.response.data.message;
    }

    return [data, err];
  };

  const contextData = {
    user,
    loginUser,
    registerUser,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AuthContext;
