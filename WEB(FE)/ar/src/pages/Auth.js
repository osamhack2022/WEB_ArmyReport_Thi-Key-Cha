import React from 'react'
import styled from 'styled-components'
import Login from '../components/Auth/Login';
import logo from '../static/image/head.png'

const AuthBlock = styled.div`
  margin-top: -120px;
  top: 0;
  width: 1920px;
  height: 1920px;
  background-color: #222831;
  background-size: cover;
`

const LogoImage = styled.img`
  padding-top: 200px;
  display: block;
  margin: auto;
`

const Auth = () => {
  return (
    <>
      <AuthBlock>
        <LogoImage src={logo} />
        <Login />
      </AuthBlock>
    </>
  )
}

export default Auth;