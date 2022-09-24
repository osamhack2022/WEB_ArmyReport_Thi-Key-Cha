import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { AuthActions } from '../app/store';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{8,16}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Auth = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [UserInfo, setUserInfo] = useState({
    userid : '',
    userpwd : '',
  })

  const { userid , userpwd } = UserInfo;

  const [validId, setvalidId] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  useEffect(()=>{

  })
  const onChange = (e) => {
    const dispatch = useDispatch(); 

    const {
      target : {name, value}
    } = e;
    console.log(name, value)
    setUserInfo({
      ...UserInfo,
      [name] : value
    });
    console.log(UserInfo);
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    /* ID, pwd 확인이 되었을 경우, 아래에 있는 dispatch 실행*/
    dispatch(AuthActions.LogIn());
    /* */
  };
  
  return (
    <div className="AR_Login_Form">
      <form onSubmit={onSubmit}>
        <div className="AR_Login_">
          <input 
            name="userid"
            type="text" 
            onChange={onChange}
            placeholder="ID를 입력해주세요"
            ref={userRef}
            required
          />
          <input
            name="userpwd"
            type="password"
            onChange={onChange}
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </div>
        <div className="AR_Login_Btns">
          <button type="button" className='AR_Login_Btn'>
            Log In
          </button>
          <button type="button" className="AR_Register_Btn">
            <Link to='/Register'>Register</Link>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Auth;