import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IconLogo from '../../static/svg/icon-logo.svg';

const HeaderLogo = () => {
  return (
    <>
      <HeaderLogoBlock>
        <Link to="/home">
          <Logo src={IconLogo} />
        </Link>
      </HeaderLogoBlock>
    </>
  )
}

const Logo = styled.img`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 4.5%;
`

const HeaderLogoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .user-logo {
    display: block;
  }
`

export default HeaderLogo;