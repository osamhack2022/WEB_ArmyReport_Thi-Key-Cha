import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};
const testSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const testActions = testSlice.actions;

export default testSlice.reducer;