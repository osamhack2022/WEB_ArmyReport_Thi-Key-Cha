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
  console.log(user)
  return (
    <>
      <OutsideClickHandler>
        <HeaederUserMenuBlock>
          <div className="user-menu">
            <p>이름 {user.data.Username}</p>
            <p>계급 {user.data.Userclass}</p>
            {/* TODO: Userlocated 내부의 프로퍼티들을 순회하여 <span> 으로 출력할 것 군단-사단-여단-대대-중대*/}
            <p>소속 {user.data.Userlocated.Batalion}</p>
            <p>상태메세지: 집 보내줘...</p>
            <p>전역일: </p>
            <p>위치:</p>
            <HeaderUserMenuItem to={`/@${user.uid}`}>정보</HeaderUserMenuItem>
          </div>
        </HeaederUserMenuBlock>
      </OutsideClickHandler>
    </>
  )
}

export default HeaederUserMenu;