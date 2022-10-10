import React from 'react';
import IconUser from '../../static/svg/icon-user.svg'
import styled from 'styled-components'
import { HeaderIconBlock as Block } from './Header'

const User = styled.img`
  position: absolute;
  width: 22px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;
  &:hover {
    box-shadow: 0px 0 18px rgba(0, 0, 0, 0.3);
  }
`

const HeaederUserIcon = ({ onClick }) => {
  return (
    <>
      <Block onClick={onClick}>
        <User src={IconUser}/>
      </Block>
    </>
  )
}

export default HeaederUserIcon;