import React, { useState, useEffect } from 'react';
import { Firestore } from './PostViewer'

const PostSuggestList = (props) => {
  const [list, setList] = useState([]);
  const coll = new Firestore()
  const runData = () => {
    coll.refColl("post-suggests")
      .then((val) => setList(val))
      .catch((e) => console.log(e));
  }
  
  useEffect(runData, [])

  return (
    <>
      {list.map(val => (
        <p key={val}>작성자: {val.uname} 올린 날짜: {val.date} 상태: {val.attacker ? '마음의편지' : '건의사항'}</p>
      ))}
    </>
  )
}

export default PostSuggestList;