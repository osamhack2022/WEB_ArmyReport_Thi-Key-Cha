import React, { useState, useEffect, useRef } from 'react';

import styles from "./Login.module.css";
import LoginBtn from './LoginBtn';

const Login = () => {
  const [UserInfo, setUserInfo] = useState({
    userid : '',
    userpwd : '',
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
  
  return (
    <>
      <div className={styles.loginform}>
        <form>
          <div className={styles.login}>
            <div className={styles.idlogin}>
              <input 
                name="userid"
                type="text" 
                onChange={onChange}
                placeholder="ID를 입력해주세요"
                ref={emailInputRef}
                className={styles.idinput}
                required
              />
            </div>
            <div className={styles.pwdlogin}>
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
          </div>
          <div className="loginbtn">
            <LoginBtn 
              email={emailInputRef} 
              pwd={passwordInputRef}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;