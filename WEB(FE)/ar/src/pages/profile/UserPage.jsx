import React, { useEffect, useState } from 'react';
import db from '../../database/DB_Manager'

const UserPage = () => {
  const [list, setList] = useState([]);
  const dbService = db.firestore();

  useEffect(() => {
    dbService
      .collection('post-letters')
      .orderBy('created_at')
      .onSnapshot((snapshot) => {
        const arr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setList(arr);
      })
  })

  return (
    <>
      {list.map((val) => <li>{val}</li>)}
    </>
  )
}

export default UserPage;