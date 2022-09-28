import { createSlice } from '@reduxjs/toolkit';
  
const AuthSlice = createSlice({
    name : 'Auth',
    initialState : {
        token: null,
        isLoggedIn : false
    },
    reducers : {
        login(state,action){
            state.token = action.payload;
            state.isLoggedIn = true;
            return state;
        },
        logout(state){
            state.token = null;
            state.isLoggedIn = false;
            return state;
        },
        statevalue(state){
            return state;
        }
    }
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;
  