import { useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import AuthContext from 'context/AuthContext';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const useApiProtected = () => {
  const { authTokens, updateTokens } = useContext(AuthContext);

  const apiProtected = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.accessToken}` },
  });

  apiProtected.interceptors.request.use(async (req) => {
    if (!authTokens?.accessToken) return req; // user needs to log in at first to get tokens

    const accessTokenPayload = jwt_decode(authTokens.accessToken);
    const isExpired = dayjs.unix(accessTokenPayload.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const newTokens = await updateTokens();
    if (newTokens) req.headers.Authorization = `Bearer ${newTokens.accessToken}`;

    return req;
  });

  return apiProtected;
};

export default useApiProtected;
