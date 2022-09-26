import React, { useEffect } from 'react';

import {useSelector, useDispatch} from 'react-redux';
import db from '../../database/DB_Manager';
import {doc, getDoc} from "firebase/firestore";

import { UserActions } from '../../app/UserSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state)=> state.UserEmail);
  console.log("uid", uid);
  const UserObj = null;

  useEffect(async() => {
    const docRef = doc(db, "User", `${uid}`);
    const docSnap = await getDoc(docRef);
    try{
        UserObj = docSnap.data();
        dispatch(UserActions.CountLastDate(UserObj.UserLastDate));
    }catch(error){
      console.log(error);
    }
  });
  
  return (
    <div className="AR_Sections_For_User">
      <section className='AR_User_Info'>
        <div className="AR_User_Img_Space">
          <img src="" alt="" />
        </div>
        <article className="AR_User_Basic_Info">
          <span>
            이름 : {UserObj.UserName}
          </span>
          <span>
            계급 : {UserObj.UserClasses}
          </span>
          <span>
            소속부대 : {UserObj.Location}
          </span>
        </article> 
        <article className="AR_User_LastDate">
          <span>남은 일수 : 100일</span>
        </article>
      </section>
    </div>
  )
}

export default Profile;