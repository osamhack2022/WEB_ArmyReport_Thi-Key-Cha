import React from 'react';
import db from '../../database/DB_Manager'
import { doc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import useHeader from '../base/hooks/useHeader';
import ProfileUserContainer from './ProfileUserContainer'
import ProfileTabs from './ProfileTabs'
import Header from '../base/Header'
import Footer from '../base/Footer'


export class Firestore {
  constructor(collection) {
    this.collection = collection;
  }

  async fetchCollection() {
    const collRef = collection(db, this.collection);
    const Snap = await getDocs(collRef);
    const data = Snap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
    return data;
  }

  async updateCollection(user, updateContent) {
    const collRef = await updateDoc(doc(db, this.collection, user.uid), {
      content: updateContent
  });
  }

  async deleteCollection(user) {
    await deleteDoc(doc(db, this.collection, user.uid));
  }
}

const ProfileViewer = () => {
  const { user } = useHeader();

  return (
    <>
      <Header />
      <ProfileUserContainer user={user.data}/>
      <ProfileTabs />
      <Footer />
    </>
  )
}

export default ProfileViewer;