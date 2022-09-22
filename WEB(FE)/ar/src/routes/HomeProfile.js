import React from 'react';
import {createSlice, configureStore} from '@reduxjs/toolkit';

const Profile = () => {
  return (
    <div className="AR_Sections_For_User">
      <section className='AR_User_Info'>
        <div className="AR_User_Img_Space">
          <img src="" alt="" />
        </div>
        <article className="AR_User_Basic_Info">
          <span>
            이름 : 안선우
          </span>
          <span>
            계급 : 상병
          </span>
          <span>
            소속부대 : 15사단 50여단 1대대 본부중대
          </span>
        </article>
        <article className="AR_User_TodoList">

        </article>
      </section>
    </div>
  )
}

export default Profile;