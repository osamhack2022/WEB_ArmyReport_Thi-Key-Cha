import { createSlice } from '@reduxjs/toolkit';
  
const UserSlice = createSlice({
    name : 'User',
    initialState : { 
        UserObj: { 
            Name: "", 
            Classes: "", 
            Location: {
                Division : "",
                Brigade : "",
                Batalion : "",
                Company : ""
            },
            LastDate : "",
        },
        uid : ""
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
        }
    }
});

export const UserActions = UserSlice.actions;

export default UserSlice.reducer;
  