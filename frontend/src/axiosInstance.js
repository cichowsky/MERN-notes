import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const apiInstance = axios.create({ baseURL });

export default apiInstance;

// //////////////////////////////////////////////////////////
// use hook useApiProtected to get access to AuthContext   //
// //////////////////////////////////////////////////////////

// export const apiProtected = axios.create({ baseURL });

// apiProtected.interceptors.request.use(async (req) => {
//   const authTokens = getLocalStorage('authTokens');
//   if (!authTokens) return req; // user needs to log in first to get tokens

//   req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;

//   const accessTokenPayload = jwt_decode(authTokens.accessToken);
//   const isExpired = dayjs.unix(accessTokenPayload.exp).diff(dayjs()) < 1;
//   if (!isExpired) return req;

//   const res = await apiInstance.post('/user/refresh', { refreshToken: authTokens.refreshToken });

//   setLocalStorage('authTokens', res.data);
//   req.headers.Authorization = `Bearer ${res.data.accessToken}`;

//   return req;
// });
