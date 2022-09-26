import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from '../features/counterAPI';

/* DB_Manager.js 에서 UserObj 를 가져온 다음 대입하여 InitialUserState 에 넣는다.*/

const initialUserState = {
    'UserEmail' : '',
    'UserName' : '',
    'UserClasses' : '',
    'UserLocation' : {
        'Division' : '',
        'Brigade' : '',
        'Batalion' : '',
        'Company' : ''
    },
    'UserLastDate' : new Date()
};
  
const UserSlice = createSlice({
    name : 'User',
    initialState : initialUserState,
    reducers : {
        CreateUserData(state){
            state.UserEmail = state.UserEmail;
            console.log(state.UserEmail);
            state.UserName = state.UserName;
            console.log(state.UserName);
            state.UserClasses = state.UserClasses;
            state.UserLocation = state.UserLocation;
            statusbar.UserLastDate = state.UserLastDate;
        },
        CountLastDate(state){
            const later = new Date(state.UserLastDate);
            const curr = new Date();
            const result = later.getTime() - curr.getTime();
            state.UserLastDate = new Date(result);
        },
        GetDefineID(state){
            const main = state.UserId.split('@');
            state.UserEmail= main[0];
        },
        PrintState(state){
            console.log(`email : ${state.UserEmail}`);
            console.log(`Name : ${state.UserName}`);
        },
    }
});

export const UserActions = UserSlice.actions;

export default UserSlice.reducer;
  