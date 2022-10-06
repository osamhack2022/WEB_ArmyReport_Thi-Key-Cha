import PostLetter from './PostLetter';
import PostSuggest from './PostSuggest';
import PostList from './PostList';
import db from '../../database/DB_Manager';
import { setDoc, addDoc, collection, query, getDocs } from 'firebase/firestore';

export class Post {
  contructor(userName, content) {
    this.userId = Math.random().toString().slice(2);
    this.userName = userName
    this.content = content; 
    this.date = new Intl.DateTimeFormat('kr', {dateStyle: 'full', timeStyle: 'short'}).format(new Date());
  }

  /**
   * @param payload Location pointing to the collection => 'letters || suggests'
   * @param data data with object type
   */
  set(payload, data="object") {
    setDoc(collection(db, "posts", payload), data);
  }

  /**
   * @param payload Location pointing to the collection => 'letters || suggests'
   */
  get(payload) {
    const q = query("posts", payload);
    const data = getDocs(q);
    const newData = data.docs.map(doc => ({
      ...doc.data()
    }))

    return newData;
  }
}

const PostViewer = () => {
  
  return (
    <>
      <PostLetter></PostLetter>
      <PostSuggest></PostSuggest>
      <PostList></PostList>
    </>
  )
}

export default PostViewer