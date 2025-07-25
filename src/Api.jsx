import axios from 'axios';


// const token = localStorage.getItem('token');
const Api = axios.create({
  baseURL: 'http://10.5.50.69:8005',
  //   baseURL: import.meta.env.VITE_API_BASE,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}`
  },
  withCredentials: true,
});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const GetData = async (route, data) => {
  try {
    const response = await Api.get(route);
    return response.data;
  } catch (error) {
    console.error("API call error: ", error.message);
    throw error;
  }
};

export const PostData = async (route, data) => {
  try {
    const response = await Api.post(route, data);
    // console.log(response,"yahi h rewpones")
    return response.data;
  } catch (error) {
    console.error("API call error: ", error.message);
    throw error;
  }
};

export const PutData = async (route, data) => {
  try {
    const response = await Api.put(route, data);
    return response.data;
  } catch (error) {
    console.error("API call error: ", error.message);
    throw error;
  }
};

export const DeleteData = async (route) => {
  try {
    const response = await Api.delete(route);
    return response.data;
  } catch (error) {
    console.error("API call error: ", error.message);
    throw error;
  }
};

export default Api;