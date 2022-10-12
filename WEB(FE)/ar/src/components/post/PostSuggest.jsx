import React from 'react'
import styled from "styled-components";
import PostSuggestWrite from './PostSuggestWrite';

const PostSuggestBlock = styled.div(`
  width: 100%;
`);

const PostSuggest = ({ user_id, user_data, coll }) => {
  return(
    <>
      <PostSuggestBlock>
        <PostSuggestWrite user_id={user_id} user_data={user_data} coll={coll} />
      </PostSuggestBlock>
    </>
  )
}

export default PostSuggest;