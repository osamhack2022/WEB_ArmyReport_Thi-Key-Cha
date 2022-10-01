import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserActions } from '../../app/UserSlice';
import { AuthActions } from '../../app/AuthSlice';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';

import styles from "./Login.module.css";

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
        dispatch(UserActions.SetUid(uid[0]));
        history(`/${uid[0]}`);
    }).catch(err => {
        alert(err.message);
    });
  }
  
  return (
    <>
      <div className={styles.loginform}>
        <form>
          <div className={styles.login}>
            <input 
              name="userid"
              type="text" 
              onChange={onChange}
              placeholder="ID를 입력해주세요"
              ref={emailInputRef}
              className={styles.idinput}
              required
            />
            <input
              name="userpwd"
              type="password"
              onChange={onChange}
              placeholder="비밀번호를 입력해주세요"
              ref={passwordInputRef}
              className={styles.pwdinput}
              required
            />
          </div>
          <div className={styles.loginbtns}>
            <div className={styles.loginbtn}>
              {!isLoad && <button 
                type="button"
                className={styles.loginbtn}
                onClick={onClick}
              >
                <span>Log In</span>
              </button> 
              }
              {isLoad && <p>Sending...</p>} 
            </div>
            <div className={styles.loginbot}>
              <span className={styles.findid}>아이디 찾기</span>
              <span className={styles.findpwd}>비밀번호 찾기</span>
              <span className={styles.registertext}>회원가입</span>
              <div className={styles.logintoadmin}>
                <span className={styles.loginadmin}>
                  관리자 로그인
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;