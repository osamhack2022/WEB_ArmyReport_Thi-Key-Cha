import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
  
const initialState = { 
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
}

const UserSlice = createSlice({
    name : 'User',
    initialState,
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
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
});

export const UserActions = UserSlice.actions;

export default UserSlice.reducer;
  