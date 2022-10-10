import React, { useState, useEffect } from 'react';
import { Firestore } from './PostViewer'

const PostLetterList = (props) => {
  const [list, setList] = useState([]);
  const coll = new Firestore()
  const runData = () => {
    coll.refColl("post-letters")
      .then((val) => setList(val))
      .catch((e) => console.log(e));
  }
  
  useEffect(runData, [])

  return (
    <>
      {list.map(val => (
        <p key={val}>작성자: {val.uname} 괴롭힌사람: {val.attacker} 올린 날짜: {val.date} 상태: {val.attacker ? '마음의편지' : '건의사항'}</p>
      ))}
    </>
  )
}

export default PostLetterList;