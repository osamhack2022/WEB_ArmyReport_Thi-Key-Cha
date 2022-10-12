import React, { useCallback, useRef } from 'react';
import useHeader from './hooks/useHeader';
import useToggle from '../../lib/hooks/uesToggle';
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify';
import HeaderLogo from './HeaderLogo'
import HeaderMainMenu from './HeaderMainMenu'
import HeaderUserIcon from './HeaderUserIcon'
import HeaderUserMenu from './HeaderUserMenu'
import HeaderNoticeIcon from './HeaderNoticeIcon'
import HeaderNoticeCard from './HeaderNotifceCard';

function Header() {
  const { user, onLogout } = useHeader();
  const [userMenu, toggleUserMenu] = useToggle(false);
  const ref = useRef(null);

  const onOutesideClick = useCallback(
    (e) => {
      if (!ref.current) {
        return;
      } else if (ref.current.contains(e.target)) {
        return;
      }
      toggleUserMenu();
    },
    [toggleUserMenu]
  )

  return (
    <>
      <Block>
        <HeaderInner className='in'>
          <HeaderLogo />
          <HeaderMainMenu user={user} />

          <HeaderNoticeIcon />
          <HeaderNoticeCard user={user}/>

          <div ref={ref}>
            <HeaderUserIcon onClick={toggleUserMenu} />
          </div>
          <HeaderUserMenu
            onLogout={onLogout}
            onClose={onOutesideClick}
            user={user}
            visible={userMenu}
          />
        </HeaderInner>
      </Block>
      <ToastContainer />
    </>
  )
}

export const HeaderIconBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    cursor: pointer;
  }
`

const HeaderInner = styled.div`
  width: 1280px;
  margin: 0 auto;
  position: relative;
  `
  
const Block = styled.div`
  width: 100%;
  top: 0;
  z-index: 10;
  background: #222831;
  .in {
    height: 80px
  }
`

export default Header;