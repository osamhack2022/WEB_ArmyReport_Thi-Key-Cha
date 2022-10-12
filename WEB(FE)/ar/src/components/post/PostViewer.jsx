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


export const Form = styled.div`
  max-width: 550px;
  marign: 1.5rem 0 0;
  position: relative;

  > small {
    color: orange;
  }
`

export const TextField = styled.div`
  .text-input {
    width: 100%;
    border: 1px solid black;
    box-sizing: border-box;
    color: black;
    outline: none;
    padding: 10px 40px 11px 1.5rem;
  }
  
  .content-space {
    height: 80px;
  }
`

export const Button = styled.button`
  display: block;
  width: 50%;
  color: white;
  height: 36px;
  background-color: #342F4B;
  border: 0;
  border-radius: 10px;
  margin: 0.25rem 0 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    > strong {
      color: tomato;
      transition: all .2s;
    }
  }
`


const PostViewer = () => {
  const { user } = useHeader();
  const postType = {
    letter: 'post-letters',
    suggest: 'post-suggests'
  }

  return (
    <>
      <Header />
      <Block>
        <PostLetter user_id={user.uid} user_data={user.data} type={postType.suggest} />
        <PostSuggest user_id={user.uid} user_data={user.data} coll={postType.letter} />
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