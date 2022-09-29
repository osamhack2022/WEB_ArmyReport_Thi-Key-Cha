import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserActions } from '../../app/UserSlice';
import { AuthActions } from '../../app/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';

import "./Login.module.css";

import db from '../../database/DB_Manager';

const Login = () => {
  const history = useNavigate();
  const [UserInfo, setUserInfo] = useState({
    userid : '',
    userpwd : '',
  });
  const [isLoad, setisLoad] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    emailInputRef.current.focus();
    passwordInputRef.current.focus();
  }, []);

  const onChange = (e) => {
    const {
      target : {name, value}
    } = e;
    setUserInfo({
      ...UserInfo,
      [name] : value
    });
  };
  
  const onClick = (event) =>{
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    setisLoad(true);

    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBY5XFBwy8nrbepRvQdj7k4vPi3GCSBjG0';

    fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }),
            header: {
                'Content-Type': 'application/json'
            }
        }
        
    ).then((res) => {
        setisLoad(false);
        if(res.ok){
            let okmessage = '로그인하였습니다!';
            alert(okmessage);
            return res.json();
        }else{
            return res.json().then(data =>{
                let errormessage = '로그인 실패!';
                if (data && data.error && data.error.message){
                    errormessage = data.error.message;
                }
                throw new Error(errorMessage);
            });
        }
    }).then(async(data) => {
        dispatch(AuthActions.login(data.idToken));
        const docRef = doc(db, "User", `${enteredEmail}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            const UserObj = docSnap.data();
            dispatch(UserActions.Creating(UserObj));
        }
        const uid = enteredEmail.split('@');
        dispatch(UserActions.SetUid(uid));
        history(`/${uid[0]}`);
    }).catch(err => {
        alert(err.message);
    });
  }
  
  return (
    <>
      <div className="ar-login-form">
        <img 
          src="AR_Logo.png" 
          alt='AR_Logo'
          className="ar-logo-img" 
        />
        <form>
          <div className="ar-login">
            <input 
              name="userid"
              type="text" 
              onChange={onChange}
              placeholder="ID를 입력해주세요"
              ref={emailInputRef}
              className="ar-login-input"
              required
            />
            <input
              name="userpwd"
              type="password"
              onChange={onChange}
              placeholder="비밀번호를 입력해주세요"
              ref={passwordInputRef}
              className="ar-login-input"
              required
            />
          </div>
          <div className="ar-login-btns">
            {!isLoad && <button 
              type="button"
              className='ar-login_btn'
              onClick={onClick}
            >
              Log In
            </button> 
            }
            {isLoad && <p>Sending...</p>
            }
            <button type="button" className="ar-register-btn">
              <Link to='/Register'>Register</Link>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;