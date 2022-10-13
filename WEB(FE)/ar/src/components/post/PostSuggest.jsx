import React from 'react'
import styled from "styled-components";
import PostSuggestWrite from './PostSuggestWrite';

const PostSuggest = ({ user_id, user_data, coll }) => {
  return(
    <>
      <Background>
        <PostSuggestInner>
          <PostSuggestWrite user_id={user_id} user_data={user_data} coll={coll} />
        </PostSuggestInner>
      </Background>
    </>
  )
}

const Background = styled.div`
  margin-top: 100px;
  border-bottom: 1px solid black;
  border: 0;
`

const PostSuggestInner = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0.5rem;
`

export default PostSuggest;