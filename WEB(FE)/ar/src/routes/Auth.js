import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Auth = () => {
  
  const onChange = (e) => {
    const {
      target : {name, value}
    } = e;
    if (name === "userid"){
      setUserId(value);
    }else if (name === "userpwd"){
      setUserPwd(value);
    }


  };
  const onSubmit = (e) =>{
    e.preventDefault();
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
            required
          />
          <input
            name="userpwd"
            type="text"
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