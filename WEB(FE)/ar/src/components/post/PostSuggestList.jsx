import React from 'react';

const PostSuggestList = ({ list }) => {
  return (
    <>
      {list.map(val => (
        <p key={val}>작성자: {val.username} 상태: {val.post_status} 올린 날짜: {val.created_at} </p>
      ))}
    </>
  )
}

export default PostSuggestList;