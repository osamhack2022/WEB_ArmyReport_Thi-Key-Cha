import { createSlice } from '@reduxjs/toolkit';
  
const UserSlice = createSlice({
    name : 'User',
    initialState : {},
    reducers : {
        Creating(state,action){
        },
        CountLastDate(state){
            const later = new Date(state.UserLastDate);
            const curr = new Date();
            const result = later.getTime() - curr.getTime();
            state.UserLastDate = new Date(result);
        },
        PrintState(state){
            console.log(`email : ${state.UserEmail}`);
            console.log(`Name : ${state.UserName}`);
        },
    }
});

export const UserActions = UserSlice.actions;

export default UserSlice.reducer;
  