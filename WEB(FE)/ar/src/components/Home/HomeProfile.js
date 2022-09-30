import React, {useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../app/UserSlice';

const HomeProfile = () => {
  const UserObj = useSelector((state)=>state.User.UserObj);
  console.log(UserObj);
  let UserLastDate = 0;
  
  const later = new Date(String(UserObj.LastDate));
  console.log(later);
  const curr = new Date();
  console.log(curr);
  const result = later.getTime() - curr.getTime();
  console.log(result);
  UserLastDate = Math.floor(Math.abs(result / (1000 * 60 * 60 * 24)));
  return (
    <div className="AR_Sections_For_User">
      <section className='AR_User_Info'>
        <div className="AR_User_Img_Space">
          <img src="" alt="" />
        </div>
        <article className="AR_User_Basic_Info">
          <span>
            이름 : { UserObj.Name }
          </span>
          <span>
            계급 : { UserObj.Classes }
          </span>

        </article> 
        <article className="AR_User_LastDate">
          <span>남은 일수 : { UserLastDate }일</span>
        </article>
      </section>
    </div>
  )
}

export default HomeProfile;