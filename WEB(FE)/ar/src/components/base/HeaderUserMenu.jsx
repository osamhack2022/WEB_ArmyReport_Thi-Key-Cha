import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components'
import HeaderUserMenuItem from './HeaderUserMenuItem'

const HeaederUserMenuBlock = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 1rem;
  right: 0;
  > .user-menu {
    position: relative;
    z-index: 5;
    width: 12rem;
    background: white;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  }
`

// interface HeaderUserMenuProps {
//   onClose: (e: React.MouseEvent) => void;
//   onLogout: () => void;
//   user: object;
//   visible: boolean;
// }

const HeaederUserMenu = ({
  onClose,
  onLogout,
  user,
  visible
}) => {
  if (!visible) return null;
  return (
    <>
      <OutsideClickHandler>
        <HeaederUserMenuBlock>
          <div className="user-menu">
            <HeaderUserMenuItem to={`/@${user.uid}`}>정보</HeaderUserMenuItem>
            <HeaderUserMenuItem onClick={onLogout}>로그아웃</HeaderUserMenuItem>
          </div>
        </HeaederUserMenuBlock>
      </OutsideClickHandler>
    </>
  )
}

export default HeaederUserMenu;