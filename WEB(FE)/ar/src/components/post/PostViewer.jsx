import React, { Component } from 'react';
import PostLetter from './LetterHead';
import PostLetterInput from './LetterInput';
import PostSuggestion from './Suggest';

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