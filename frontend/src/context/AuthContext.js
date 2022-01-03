import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from 'axiosInstance';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authTokensFromLS = localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null;

  const userFromLS = authTokensFromLS ? jwt_decode(authTokensFromLS.accessToken).user_id : null;

  const [authTokens, setAuthTokens] = useState(() => authTokensFromLS);
  const [user, setUser] = useState(() => userFromLS);

  const navigate = useNavigate();

  const registerUser = async (userData) => {
    let data;
    let err;

    try {
      const res = await api.post('/user/register', userData);
      data = res.data;

      navigate('/auth/login');
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
      localStorage.setItem('authTokens', JSON.stringify(data));

      const decodedPayload = jwt_decode(data.accessToken);
      setUser(decodedPayload.user_id);

      navigate('/notes');
    } catch (error) {
      err = error.response.data.message;
    }

    return [data, err];
  };

  const logoutUser = async () => {
    const body = { refreshToken: authTokens.refreshToken };
    await api.delete('/user/logout', { data: body });

    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AuthContext;
