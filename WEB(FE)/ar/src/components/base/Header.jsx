import React, { useCallback, useRef } from 'react';
import useHeader from './hooks/useHeader';
import useToggle from '../../lib/hooks/uesToggle';
import styled from 'styled-components'
import HeaderLogo from './HeaderLogo'
import HeaderMainMenu from './HeaderMainMenu'
import HeaderUserIcon from './HeaderUserIcon'
import HeaderUserMenu from './HeaderUserMenu'
import HeaderNoticeIcon from './HeaderNoticeIcon'

function Header() {
  const { user } = useHeader();
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

          <div ref={ref}>
            <HeaderUserIcon onClick={toggleUserMenu} />
          </div>
          <HeaderUserMenu
            onClose={onOutesideClick}
            user={user}
            visible={userMenu}
          />
        </HeaderInner>
      </Block>
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
  position: fixed;
  top: 0;
  background: #222831;
  .in {
    height: 80px
  }
`

export default Header;