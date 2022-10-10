import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
    token: null,
    isLoggedIn : false
}

const AuthSlice = createSlice({
    name : 'Auth',
    initialState,
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
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;
  