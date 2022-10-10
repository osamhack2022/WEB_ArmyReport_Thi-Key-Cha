import { createSlice } from '@reduxjs/toolkit';
  
const PostSlice = createSlice({
    name : 'Post',
});

export const PostActions = PostSlice.actions;

export default PostSlice.reducer;
  