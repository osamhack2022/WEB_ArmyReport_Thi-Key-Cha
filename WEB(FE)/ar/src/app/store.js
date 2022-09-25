import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserSlice';

const store = configureStore({
  reducer: {
    User : UserReducer
  },
});

export default store;
