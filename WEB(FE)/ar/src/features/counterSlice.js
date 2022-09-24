import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  User_ID : '',
  LoggedIn : false,
  User_Last_Date : Date.now(),
  
};

const UserState = createSlice({
  name : 'User',
  initialState,
  reducer : {

  }
})

export default UserState.reducer;
