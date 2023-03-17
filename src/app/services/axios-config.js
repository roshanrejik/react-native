import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://dummyjson.com';
let token = null;
const setToken = async () => {
  try {
    const value = await AsyncStorage.getItem('authToken');
    if (value !== null) {
      token = value.token;
    }
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthToken = async () => {
  let data = await AsyncStorage.getItem('authToken');
  console.log(data, 'authToken');
  return AsyncStorage.getItem('authToken');
};

httpClient.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: getAuthToken(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const request = {
  get: (url, params) => httpClient.get(url),
  post: (url, data) => httpClient.post(url, data),
  put: (url, data) => httpClient.put(url, data),
  patch: (url, data) => httpClient.patch(url, data),
  delete: (url, data) => httpClient.delete(url, { data: data }),
};

const Auth = {
  login: (data) => request.post('/auth/login', data),
};

const Profile = {
  getById: (id) => request.get(`/users/${id}`),
};

const Products = {
  getAllProducts: () => request.get('/products'),
  getSingleProducts: (id) => request.get(`/products/${id}`),
};

const Cart = {
  getCartOfUser: (id) => request.get(`/carts/user/${id}`),
  setCartOfUser: (data) =>
    request.post(`https://dummyjson.com/carts/add`, data),
};
export const api = {
  Auth,
  Profile,
  Products,
  Cart,
};
