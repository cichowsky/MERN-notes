import { useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import AuthContext from 'context/AuthContext';
import api from 'axiosInstance';
import { setLocalStorage } from 'utils/helpers';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const useApiProtected = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const apiProtected = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.accessToken}` },
  });

  apiProtected.interceptors.request.use(async (req) => {
    if (!authTokens?.accessToken) return req; // user needs to log in first to get tokens

    const accessTokenPayload = jwt_decode(authTokens.accessToken);
    const isExpired = dayjs.unix(accessTokenPayload.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const res = await api.post('/user/refresh', { refreshToken: authTokens.refreshToken });

    setLocalStorage('authTokens', res.data);
    setAuthTokens(res.data);
    setUser(jwt_decode(res.data.accessToken).user_id);

    req.headers.Authorization = `Bearer ${res.data.accessToken}`;

    return req;
  });

  return apiProtected;
};

export default useApiProtected;
