import React, { Component } from 'react';
import PostLetter from './PostLetterHead/PostLetterHead';
import PostLetterInput from './PostLetterInput/PostLetterInput';
import PostSuggestion from './PostSuggestion/PostSuggestion';

const PostViewer = () => {
  
  return (
    <>
      <PostLetter></PostLetter>
      <PostLetterInput></PostLetterInput>
      <PostSuggestion></PostSuggestion>
    </>
  )
}

export default PostViewer