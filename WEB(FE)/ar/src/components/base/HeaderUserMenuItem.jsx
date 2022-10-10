import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const WrapperLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`

const HeaederUserMenuItemBlock = styled.div`
  color: #ccc;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #ccc;
    color: black;
  }
`

// interface HedaerUserrMenuItemProps {
//   to?: stirng;
//   onClick?: () => void;
// }

const HeaederUserMenuItem = ({
  children,
  to,
  onClick
}) => {
  return (
    <>
      <WrapperLink to={to}>
        <HeaederUserMenuItemBlock onClick={onClick}>
          {children}
        </HeaederUserMenuItemBlock>
      </WrapperLink>
    </>
  )
}

export default HeaederUserMenuItem;