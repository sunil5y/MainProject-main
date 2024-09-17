import { configureStore } from '@reduxjs/toolkit';
//import authReducer from '../features/auth/authSlice';
//import navbarReducer from './redux/features/navbar/navbarSlice';
import navbarReducer from  '../features/navbar/nabvarSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navbar: navbarReducer,
  },
});