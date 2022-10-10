import React from 'react'
import PostLetter from './PostLetter';
import PostSuggest from './PostSuggest';
import { ToastContainer } from 'react-toastify'
import Header from '../base/Header'
import Footer from '../base/Footer'
import db from '../../database/DB_Manager';
import { setDoc, query, collection, getDocs } from 'firebase/firestore';
import styled from "styled-components";
import useHeader from '../base/hooks/useHeader';

export class Post {
  /**
   * @param content the contents of a letter of one's heart
   * @param victim user's name
   * @param attacker the person who hit the user
   */
  constructor(userId, username, attacker, content, deleted, post_status="letter | suggest") {
    this.userId = userId;
    this.username = username;
    this.attacker = attacker;
    this.content = content;
    this.deleted = deleted;
    this.post_status = post_status;
    this.created_at = new Intl.DateTimeFormat('kr', {dateStyle: 'full', timeStyle: 'short'}).format(new Date());
  }
}

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
        <PostLetter uid={user.uid} udata={user.data} type="post-letters" />
        <PostSuggest uid={user.uid} udata={user.data} type="post-suggests" />
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