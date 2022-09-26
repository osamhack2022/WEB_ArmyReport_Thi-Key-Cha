import React, { useState, useEffect, useRef, useContext } from 'react';

import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();
  const [UserInfo, setUserInfo] = useState({
    userid : '',
    userpwd : '',
  });
  const [isLoad, setisLoad] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  

  const authCtx = useContext(AuthContext);


  useEffect(() => {
    emailInputRef.current.focus();
    passwordInputRef.current.focus();
  }, []);

  const onChange = (e) => {
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
    }).then(data => {
        authCtx.login(data.idToken);
        const uid = enteredEmail.split('@');
        history(`/${uid[0]}`);
    }).catch(err => {
        alert(err.message);
    });
  }
  
  return (
    <>
      <div className="AR_Login_Form">
        <form>
          <label htmlFor="LoginForm">
            Log In
          </label>
          <div className="AR_Login_">
            <input 
              name="userid"
              type="text" 
              onChange={onChange}
              placeholder="ID를 입력해주세요"
              ref={emailInputRef}
              required
            />
            <input
              name="userpwd"
              type="password"
              onChange={onChange}
              placeholder="비밀번호를 입력해주세요"
              ref={passwordInputRef}
              required
            />
          </div>
          <div className="AR_Login_Btns">
            {!isLoad && <button 
              type="button" 
              className='AR_Login_Btn'
              onClick={onClick}
            >
              Log In
            </button> 
            }
            {isLoad && <p>Sending...</p>
            }
            <button type="button" className="AR_Register_Btn">
              <Link to='/Register'>Register</Link>
            </button>
          </div>
        </form>
      </div>
    </>
    
  )
}

export default Login;