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
  const [loading, setLoading] = useState(true);

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
    let err;

    try {
      const res = await api.post('/user/login', userData);
      const { data } = res;

      setAuthTokens(data);
      localStorage.setItem('authTokens', JSON.stringify(data));

      const decodedPayload = jwt_decode(data.accessToken);
      setUser(decodedPayload.user_id);

      navigate('/notes');
    } catch (error) {
      err = error.response.data.message;
    }

    return [err];
  };

  const logoutUser = async () => {
    const body = { refreshToken: authTokens?.refreshToken };
    await api.delete('/user/logout', { data: body });

    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const updateToken = async () => {
    try {
      const body = { refreshToken: authTokens?.refreshToken };
      const res = await api.post('/user/refresh', body);
      const { data } = res;

      setAuthTokens(data);
      localStorage.setItem('authTokens', JSON.stringify(data));

      const decodedPayload = jwt_decode(data.accessToken);
      setUser(decodedPayload.user_id);
    } catch (error) {
      await logoutUser();
    }

    if (loading) setLoading(false);
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
    updateToken,
  };

  useEffect(() => {
    if (loading) {
      if (authTokens) updateToken();
      if (!authTokens) setLoading(false);
    }

    const expireTime = 1000 * 10; // 4 minutes (1 minute less than in backend)
    const interval = setInterval(() => {
      if (authTokens) updateToken();
    }, expireTime);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AuthContext;
