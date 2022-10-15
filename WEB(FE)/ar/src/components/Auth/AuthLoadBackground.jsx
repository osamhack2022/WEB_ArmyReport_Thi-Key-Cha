import React from 'react';
import styled from 'styled-components'
import logo from '../../static/image/head.png'

const AuthLoadBackgroundBlock = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Background = styled.div`
  position: absolute;
  width: 1920px;
  height: 1080px;
  z-index: 50;
  background-color: #222831;
`

const LogoImage = styled.img`
  padding-top: 200px;
  display: block;
  margin: auto;
`

const Text = styled.div`
  font-famliy: GothicA1 Regular;
  text-align: center;
  color: white;
  font-size: 36px;
`



const AuthLoadBackground = () => {
  return (
    <>
    <AuthLoadBackgroundBlock>
      <LogoImage src={logo} />
      <Text>접속중 ...</Text>
    </AuthLoadBackgroundBlock>
    <Background />
    </>
  );
};

export default AuthLoadBackground;