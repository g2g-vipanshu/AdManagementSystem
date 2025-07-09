import axios from 'axios';


const token = localStorage.getItem('token');
const api = axios.create({
  baseURL: 'http://localhost:8005',
//   baseURL: import.meta.env.VITE_API_BASE,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}` 
  },

  withCredentials: true,
});

export const GetData = async (route, data) => {
  try {
    const response = await api.get(route);
    return response.data;
  } catch (error) {
    console.error("API call error: ", error.message);
    throw error;
  }
};

export const PostData = async (route, data) => {
  try {
    const response = await api.post(route, data);
    // console.log(response,"yahi h rewpones")
    return response.data;
  } catch (error) {
    console.error("API call error: ", error.message);
    throw error;
  }
};

export const PutData = async (route, data) => {
  try {
    const response = await api.put(route, data);
    return response.data;
  } catch (error) {
    console.error("API call error: ", error.message);
    throw error;
  }
};

export const DeleteData = async (route) => {
  try {
    const response = await api.delete(route);
    return response.data;
  } catch (error) {
    console.error("API call error: ", error.message);
    throw error;
  }
};
