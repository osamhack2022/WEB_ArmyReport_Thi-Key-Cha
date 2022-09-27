import React from 'react';

import { useSelector } from 'react-redux';

const HomeProfile = () => {
  const UserObj = useSelector((state) => state.User);

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

export default HomeProfile;