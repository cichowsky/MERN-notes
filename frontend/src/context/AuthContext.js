import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from 'utils/helpers';
import api from 'axiosInstance';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authTokensLS = getLocalStorage('authTokens');
  const userLS = authTokensLS ? jwt_decode(authTokensLS.accessToken).user_id : null;

  const [authTokens, setAuthTokens] = useState(() => authTokensLS);
  const [user, setUser] = useState(() => userLS);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const updateAuthState = (tokens) => {
    setAuthTokens(tokens);
    setLocalStorage('authTokens', tokens);

    const accessTokenPayload = jwt_decode(tokens.accessToken);
    setUser(accessTokenPayload.user_id);
  };

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
      const tokens = res.data;

      updateAuthState(tokens);

      navigate('/notes');
    } catch (error) {
      err = error.response.data.message;
    }

    return [err];
  };

  const logoutUser = async () => {
    await api.delete('/user/logout', { data: { refreshToken: authTokens?.refreshToken } });

    setAuthTokens(null);
    setUser(null);
    removeLocalStorage('authTokens');
  };

  const updateTokens = async () => {
    let newTokens;

    try {
      const res = await api.post('/user/refresh', { refreshToken: authTokens?.refreshToken });
      newTokens = res.data;

      updateAuthState(newTokens);
    } catch (error) {
      // there is no refreshToken in DB - log out
      await logoutUser();
    }

    return newTokens;
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
    updateTokens,
  };

  useEffect(() => {
    if (authTokens) {
      const { user_id } = jwt_decode(authTokens.accessToken);
      setUser(user_id);
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AuthContext;
