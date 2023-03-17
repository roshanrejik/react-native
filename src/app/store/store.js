import { configureStore, createReducer } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import loginReducer from '../features/Login/loginSlice';
import profileReducer from '../features/Profile/profileSlice';
import productReducer from '../features/Products/ProductSlice';
import cartReducer from '../features/Cart/CartSlice';
export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    products: productReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
