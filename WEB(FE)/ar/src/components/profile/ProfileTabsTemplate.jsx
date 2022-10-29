import { useEffect, useState } from 'react';
import styled from 'styled-components'
import db from '../../database/DB_Manager';
import { doc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import ProfileTabsList from './ProfileTabsList'
import BabyOguBroken from '../../static/image/baby-ogu-broken2.png'

const ProfileTabsTemplate = ({ coll, uid }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const collRef = collection(db, coll);
    const Snap = await getDocs(collRef);
    const data = Snap.docs.map(doc => ({
      ...doc.data(), id: doc.id
    }))
    setList([...list, ...data]);
  }

  const onUpdate = async (updateContent) => {
    const collRef = await updateDoc(doc(db, coll, uid), {
      content: updateContent
    });
  }

  const onDelete = async (e, id) => {
    e.preventDefault();
    if (window.confirm("삭제 하시겠습니까?")) {
      alert("삭제 되었습니다.");
      await deleteDoc(doc(db, coll, id));
    } else {
      alert("취소했습니다.");
      return;
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <>
      {list.length > 0 ? 
        <ProfileTabsList uid={uid} list={list} onDelete={onDelete} onUpdate={onUpdate} /> : 
        <ProfileTabsListNoneBlock>
          <img src={BabyOguBroken} alt="" />
          <span>내용이 없습니다</span>
        </ProfileTabsListNoneBlock>
      }
    </>
  );
}

const ProfileTabsListNoneBlock = styled.div`
  width: 100%;
  text-align: center;
  
  span {
    color: black;
    display: block;
    font-size: 2.3rem;
  }
`

export default ProfileTabsTemplate;