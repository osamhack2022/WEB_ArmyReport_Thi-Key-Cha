import React from 'react';
import styled from 'styled-components';
import Baby_Ogu_work from '../../static/image/baby-ogu-shovel.png'

const ProfileUserContainerBlock = styled.div`
  position: relative;
  width: 1200px;
`

const Avatar = styled.span`
  float: left;
  margin-right: 18px;

  img {
    vertical-align: middle;
  }
`

const ProfileUserContainer = ({ data }) => {
  return (
    <>
      <ProfileUserContainerBlock>
        <Avatar>
          <img src={Baby_Ogu_work} />
        </Avatar>
        <span>{data.Userclass} {data.Username}</span>
        <span>접속횟수: data.count_join</span>
        <span>전역: data.discharge_week</span>
        <span>휴가: data.vacation_week</span>
      </ProfileUserContainerBlock>
    </>
  )
}

export default ProfileUserContainer;