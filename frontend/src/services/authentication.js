import api from 'axiosInstance';

export const register = async (userData) => {
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

export const login = async (userData) => {
  let data;
  let err;

  try {
    const res = await api.post('/user/login', userData);
    data = res.data;
    // todo JWT
  } catch (error) {
    err = error.response.data.message;
  }

  return [data, err];
};
