import React from 'react';
import IconBell from '../../static/svg/icon-bell.svg'
import styled from 'styled-components'
import { HeaderIconBlock as Block } from './Header'

const Notice = styled.img`
  position: absolute;
  width: 18px;
  right: 36px;
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
        <Notice src={IconBell}/>
      </Block>
    </>
  )
}

export default HeaederUserIcon;