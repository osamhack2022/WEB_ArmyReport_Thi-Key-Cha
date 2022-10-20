import React from 'react';
import styled from 'styled-components';
import Baby_Ogu_work from '../../static/image/baby-ogu-shovel.png'

const ProfileUserContainerBlock = styled.div`
  position: relative;
  width: 1400px;
  margin: 0 auto;
`

const Avatar = styled.div`
  position: absolute;
  border: 0;
  border-radius: 30px;
  background: #574F7D;
  left: 20%;
  padding: 1.5rem;
  box-shadow: 5px 2px 10px rgb(0, 0, 0, 0.1);

  img {
    vertical-align: middle;
  }
`

const Background = styled.div`
  height: 400px;
  background: #222831;
  padding: 3rem;
`

const ElementUlInfo = styled.ul`
  list-style: none;
  padding: 1.5rem;
  width: 300px;
  margin: 0 auto;
  
  li {
    color: white;
    font-size: 18px;
    > h2 {
      font-size: 32px;
      font-weight: 900;
      color: white;
      line-height: 1rem;
    }
  }
`

const ProfileUserContainer = ({ user }) => {

  return (
    <>
      <Background>
        <ProfileUserContainerBlock>
          <Avatar>
            <img src={Baby_Ogu_work} alt="" />
          </Avatar>
          <ElementUlInfo>
            <li>
              <h2>{user.Userclass} {user.Username}</h2>
            </li>
            <li>전역일 D-</li>
            <li>휴가일 D-</li>
            <li>접속횟수 1,492</li>
          </ElementUlInfo>
        </ProfileUserContainerBlock>
      </Background>
    </>
  )
}

export default ProfileUserContainer;