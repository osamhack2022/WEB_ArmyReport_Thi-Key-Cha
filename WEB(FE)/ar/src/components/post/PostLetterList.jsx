import React from 'react';

const PostLetterList = ({ list }) => {
  return (
    <>
      {list.map(val => (
        <p key={val.date}>작성자: {val.uname} 괴롭힌사람: {val.attacker} 올린 날짜: {val.date} 상태: {val.status}</p>
      ))}
    </>
  )
}

export default PostLetterList;