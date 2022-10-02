import React,{useState} from 'react'

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { doc, getDoc } from 'firebase/firestore';
import db from '../../database/DB_Manager';

import { UserActions } from '../../app/UserSlice';
import { AuthActions } from '../../app/AuthSlice';

import style from './LoginBtn.module.css';

const LoginBtn = ({email,pwd}) => {
    
  const history = useNavigate();
  const dispatch = useDispatch();
  const [isLoad, setisLoad] = useState(false);

  const onClick = (event) =>{
    event.preventDefault();
    
    const enteredEmail = email.current.value;
    const enteredPassword = pwd.current.value;
    
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
                throw new Error(errormessage);
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
        <div className="loginbtns">
            <div className="loginbtn">
                {!isLoad && <button 
                type="button"
                className="loginbtn"
                onClick={onClick}
                >
                <span>Log In</span>
                </button> 
                }
                {isLoad && <p>Sending...</p>} 
            </div>
            <div className="loginbot">
                <span className="findid">아이디 찾기</span>
                <span className="findpwd">비밀번호 찾기</span>
                <span className="registertext">회원가입</span>
                <div className="logintoadmin">
                    <span className="loginadmin">
                        관리자 로그인
                    </span>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginBtn