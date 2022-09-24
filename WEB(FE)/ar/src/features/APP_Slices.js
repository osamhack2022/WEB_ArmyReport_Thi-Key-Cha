import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

/* DB_Manager.js 에서 UserObj 를 가져온 다음 대입하여 InitialUserState 에 넣는다.*/
const UserObj = 0; 

const initialUserState = {
  User : UserObj,
};

const UserSlice = createSlice({
  name : 'User',
  initialState : initialUserState,
  reducer : {
    Get_ID(state){
      User_Id = state.UserId;
    },
    Get_Name(state){
      state.User.UserName = state.UserName;
    },
    Get_Class(state){
      state.User.UserClasses = state.UserClasses;
    },
    Get_Location(state){
      state.UserLocation = state.UserLocation;
    },
    Get_LastDate(state){
      state.User_Last_Date = state.UserLastDate;
    },
    Get_Total(state){
      state = state;
    }
  }
})

const initialAuthState = {
  LoggedIn : false,
};

const AuthSlice = createSlice({
  name : 'Auth',
  initialState : initialAuthState,
  LogIn(state){
    state.LoggedIn = true
  },
  LogOut(state){
    state.LoggedIn = false
  },
})

export default UserSlice.reducer;
