import React from 'react'
import PostLetter from './PostLetter';
import PostSuggest from './PostSuggest';
import PostLetterList from './PostLetterList';
import PostSuggestList from './PostSuggestList';
import { ToastContainer } from 'react-toastify'
import Header from '../base/Header'
import Footer from '../base/Footer'
import db from '../../database/DB_Manager';
import { setDoc, query, collection, getDocs } from 'firebase/firestore';
import styled from "styled-components";
import useHeader from '../base/hooks/useHeader';

/**
 * 무슨 이유인지 모르겠는데 다른 파일에서 extends 상속이 안됨.
 * 컴포넌트 라는 타입을 가지고 있기 때문인지...
 */
// class Post {
//   contructor(userName, content) {
//     this.userId = Math.random().toString().slice(2);
//     this.userName = userName
//     this.content = content; 
//     this.date = new Intl.DateTimeFormat('kr', {dateStyle: 'full', timeStyle: 'short'}).format(new Date());
//   }

//   /**
//    * @param payload Location pointing to the collection => 'letters || suggests'
//    * @param data data with object type
//    */
//   set(payload, data="object") {
//     setDoc(collection(db, "posts", payload), data);
//   }

//   /**
//    * @param payload Location pointing to the collection => 'letters || suggests'
//    */
//   get(payload) {
//     const q = query("posts", payload);
//     const data = getDocs(q);
//     const newData = data.docs.map(doc => ({
//       ...doc.data()
//     }))

//     return newData;
//   }
// }

export class Firestore {
  contructor() {}

  async refColl(docName) {
    const q = await query(collection(db, docName));
    const data = await getDocs(q);
    const newData = data.docs.map(doc => ({
      ...doc.data()
    }))
    
    return newData;
  }
}

const PostViewer = () => {
  const { user } = useHeader();

  return (
    <>
      <Header />
      <Block>
        <PostLetter uid={user.uid} udata={user.data}></PostLetter>
        <PostSuggest uid={user.uid} udata={user.data}></PostSuggest>
        <PostLetterList />
        <PostSuggestList />
      </Block>
      <Footer />
      <ToastContainer />
    </>
  )
}

const Block = styled.div`
  position: relative;
`

export default PostViewer