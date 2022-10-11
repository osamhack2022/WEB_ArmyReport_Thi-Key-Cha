import React, { useState, useEffect, useRef } from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Radio } from 'antd';
import "antd/dist/antd.min.css";
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';
import db from '../../database/DB_Manager';

import { UserActions } from '../../app/slice/UserSlice';
import { AuthActions } from '../../app/slice/AuthSlice';

const AuthLoginBlock = styled.div`
  position: relative;
  font-famliy: GothicA1 Regular;
  label {
    color: white;
  }

  svg {
    fill: white;
  }
`

const Login = () => {

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');

  const [UserInfo, setUserInfo] = useState({
    userid : '',
    userpwd : '',
  });
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
    <AuthLoginBlock>
      <LoginForm
        form={form}
        layout="vertical"
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onSubmit={(e) =>e.preventDefault()}
        onFinish={onSubmit}
      >
        <LabelItem 
          required tooltip="이메일 입력란입니다."
        >
          <EmailInput
            name='userid'
            placeholder="Email"
            onChange={onChange}
          />
        </LabelItem>
        <LabelItem
          tooltip={{
            title: '비밀번호 입력란입니다.',
            icon: <InfoCircleOutlined />,
          }}
          
        >
          <PwdInput
            name='userpwd'
            placeholder="Password" 
            onChange={onChange}
          />
        </LabelItem>
        {!isLoad && 
        <Button type="primary" htmlType="submit">
          로그인
        </Button>}
        {isLoad && <LabelItem>
          <Button type="primary" disabled>Loading...</Button>
        </LabelItem>}
        <OtherButton>
          <ul>
            <li><Link to="/register">회원가입</Link></li>
            <li><Link to="/">이메일 찾기</Link></li>
            <li><Link to="/">비밀번호 찾기</Link></li>
            <li><Link to="/">관리자 로그인</Link></li>
          </ul>
        </OtherButton>
      </LoginForm>
    </AuthLoginBlock>
    </>
  )
}

const LoginForm = styled(Form)`
  width: 550px;
  padding-top: 32px;
  position: relative;
  margin: 0 auto;
  text-align: center;
  display: block;
`
  
const LabelItem = styled(Form.Item)`
  text-align: center;
`

const OtherButton = styled.div`
  float: left;
  margin-top: 18px;
  width: 100%;

  ul {
    list-style: none;
  }

  li {
    width: 23%;
    float: left;
    text-algin: center;
    border-left: 1px solid #AAC3D6;
    &:first-child {
      border-left: none;
    }
  }

  a {
    color: white;
    cursor: pointer;
    width: 100%;
    &:hover {
      font-weight: bold;
    }
  }
`


const Button = styled.button`
  width: 550px;
  height: 80px;
  background-color: #574F7D;
  border-radius: 50px;
  color: white;
  font-size: 24px;
  border: none;
  outline: none;
  cursor: pointer;
`

const EmailInput = styled(Input)`
  width: 550px;
  height: 90px;
  background-color: transparent;
  color: white;
  font-size: 18px;
  padding-left: 32px;
  border: 5px solid #574F7D;
  border-radius: 30px;
  &:hover {
    border: 5px solid #574F7D;
  }
  &:focus {
    border: 5px solid #574F7D;
  }
`

const PwdInput = styled(Input.Password)`
  margin-top: -50px;
  width: 550px;
  height: 90px;
  background-color: transparent;
  color: white;
  padding-left: 32px;
  border: 5px solid #574F7D;
  border-radius: 30px;
  &:hover {
    border: 5px solid #574F7D;
  }
  &:focus {
    border: 5px solid #574F7D;
  }
  
  input {
    background-color: transparent;
    font-size: 18px;
    color: white;
  }
  
  span {
    &:hover {
      border-right-width: none;
      border-color: none;
    }
  }
`

export default Login;