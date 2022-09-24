import { configureStore } from '@reduxjs/toolkit';
import { UserSlice, AuthSlice } from '../features/APP_Slices';

const store = configureStore({
  reducer: {
    User : UserSlice.reducer,
    Auth : AuthSlice.reducer,
  },
});

export const UserActions = UserSlice.actions;
export const AuthActions = AuthSlice.actions;

export default store;
