import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserSlice';
import AuthReducer from './AuthSlice';

const store = configureStore({
  reducer: {
    User : UserReducer,
    Auth : AuthReducer
  },
});

export default store;
