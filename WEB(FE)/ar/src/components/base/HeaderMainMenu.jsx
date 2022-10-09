import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const HedaerMainMenuBlock = styled.div`
  position: absolute;
  line-height: 3rem;
  bottom: 0;
  left: 36px;
  display: flex;
  font-famliy: GothicA1 Regular;

  .route-item {
    padding: 0 12px;
    display: inline-block;
    color: white;
    font-size: 18px;
  }

  a {
    color: #ccc;
    aliagn-items: cetner;
    text-decoration: none;
    &:hover {
      color: white;
      text-decoration: underline;
    }
  }
`

const HeaderMainMenu = ({user}) => {
  return (
    <>
      <HedaerMainMenuBlock>
        <ul>
          <li className='route-item'>
            <Link to="/post">
              마음의 편지
            </Link>
          </li>
          <li className='route-item'>
            <Link to="/post">
              건의 사항
            </Link>
          </li>
          <li className='route-item'>
            <Link to="/vaction">
              휴가
            </Link>
          </li>
        </ul>
      </HedaerMainMenuBlock>
    </>
  )
}

export default HeaderMainMenu;