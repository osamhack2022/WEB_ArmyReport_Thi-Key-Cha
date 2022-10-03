import React, { useState, useEffect, useRef } from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio } from 'antd';

import styles from "./Login.module.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';
import db from '../../database/DB_Manager';

import { UserActions } from '../../app/UserSlice';
import { AuthActions } from '../../app/AuthSlice';

const Login = () => {

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');

  const [UserInfo, setUserInfo] = useState({
    userid : '',
    userpwd : '',
  });
/*
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    emailInputRef.current.focus();
    passwordInputRef.current.focus();
  }, []);
*/
  const onChange = (e) => {
    const {
      target : {name, value}
    } = e;
    setUserInfo({
      ...UserInfo,
      [name] : value
    });
  };

  const history = useNavigate();
  const dispatch = useDispatch();
  const [isLoad, setisLoad] = useState(false);

  const onSubmit = () =>{
    /*
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    */
    const enteredEmail = UserInfo.userid;
    const enteredPassword = UserInfo.userpwd;
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
        const uid = enteredEmail.split('@');
        dispatch(AuthActions.login(data.idToken));
        const docRef = doc(db, "02155004", "본부중대", "User",`${uid[0]}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            const UserObj = docSnap.data();
            dispatch(UserActions.Creating(UserObj));
        }
        dispatch(UserActions.SetUid(uid[0]));
        history(`/${uid[0]}`);
      }).catch(err => {
        alert(err.message);
      });
  }
  
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onSubmit={(e) =>e.preventDefault()}
        onFinish={onSubmit}
      >
        <Form.Item 
          label="Email" 
          required tooltip="작성해주셔야 합니다. ㅡ3ㅡ"
        >
          <Input 
            name='userid'
            placeholder="이메일입니다만?"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          tooltip={{
            title: '조금만 더 힘내요!',
            icon: <InfoCircleOutlined />,
          }}
          
        >
          <Input.Password
            name='userpwd'
            placeholder="비밀번호입니다만?" 
            onChange={onChange}
          />
        </Form.Item>
        {!isLoad && 
        <Button type="primary" htmlType="submit">
          Submit
        </Button>}
        {isLoad && <Form.Item>
          <Button type="primary" disabled>Loading...</Button>
        </Form.Item>}
        <Form.Item>
          <Button type="primary" onClick={() => history('/register')}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login;