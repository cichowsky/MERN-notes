import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from 'utils/helpers';
import api, { apiProtected } from 'axiosInstance';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authTokensLS = getLocalStorage('authTokens');
  const userLS = authTokensLS ? jwt_decode(authTokensLS.accessToken).user_id : null;

  const [authTokens, setAuthTokens] = useState(() => authTokensLS);
  const [user, setUser] = useState(() => userLS);
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
      setLocalStorage('authTokens', data);

      const tokenPayload = jwt_decode(data.accessToken);
      setUser(tokenPayload.user_id);

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

  // const updateToken = async () => {
  //   try {
  //     const res = await api.post('/user/refresh', { refreshToken: authTokens?.refreshToken });
  //     const { data } = res;

  //     setAuthTokens(data);
  //     setLocalStorage('authTokens', data);

  //     const tokenPayload = jwt_decode(data.accessToken);
  //     setUser(tokenPayload.user_id);
  //   } catch (error) {
  //     await logoutUser();
  //   }

  //   if (loading) setLoading(false);
  // };

  const contextData = {
    user,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
    // updateToken,
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
