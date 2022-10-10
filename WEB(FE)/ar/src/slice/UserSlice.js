import { createSlice } from '@reduxjs/toolkit';
  
const UserSlice = createSlice({
    name : 'User',
    initialState : { 
        UserObj: {
            UserEmail: "", 
            UserName: "", 
            Classes: "", 
            UserLocation: {
                Crop : "",
                Division : "",
                Brigade : "",
                Batalion : "",
                Company : ""
            },
            UserLastDate : "",
        },
        uid : "",
        isLocated: "",
        isVacation : false,
    },
    reducers : {
        Creating(state,action){
            state.UserObj = action.payload;
        },
        PutingState(state){
            return state;
        },
        SetUid(state,action){
            state.uid = action.payload;
        },
        ImVacation(state){
            state.isVacation = true;
            return state;
        },
        IsLocated(state,action){
            state.isLocated = action.payload;
        },
        IsVacation(state){
            return state.isVacation;
        }
    }
});

export const UserActions = UserSlice.actions;

export default UserSlice.reducer;
  