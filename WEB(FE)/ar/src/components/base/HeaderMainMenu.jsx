import { Link } from 'react-router-dom';
import styled from 'styled-components'
import HeaderMainMenuContents from './HeaderMainMenuContents'

const Wrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  
  .route-item {
    padding: 0 12px;
    display: inline-block;
    color: white;
    font-size: 18px;
  }
`

const HeaderMainMenu = ({user}) => {
  return (
    <>
      <Wrap>
        <ul>
          <li className='route-item'>
            <Link to={`/${user.uid}`}>홈으로</Link>
          </li>
          <li className='route-item'>
            <Link to="/post">
              포스트
            </Link>
            <HeaderMainMenuContents />
          </li>
          <li className='route-item'>
            <Link>휴가</Link>
          </li>
        </ul>
      </Wrap>
    </>
  )
}

export default HeaderMainMenu;