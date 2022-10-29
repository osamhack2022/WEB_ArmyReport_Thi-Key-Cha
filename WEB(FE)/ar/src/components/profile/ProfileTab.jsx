import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';
import ProfileTabsTemplate from './ProfileTabsTemplate';
import { Firestore } from './ProfileViewer'

const TabMenus = styled(TabList)`
  display: flex;
  padding: 0;
  text-align: center;
  list-style: none;
  justify-content: center;
`

const TabItem = styled(Tab)`
  float: left;
  padding: 1.2rem;
  font-size: 24px;
  font-weight: 400;
  cursor: pointer;
`

const TabText = styled.span`
  color: #ccc;
  font-size: 24px;

  &:hover {
    color: black;
    font-weight: 900;
  }
`

const ProfileTabs = ({ type, uid }) => {
  
  return (
    <>
      <Tabs>
        <TabMenus>
          <TabItem>
            <TabText>마음의 편지</TabText>
          </TabItem>
          <TabItem>
            <TabText>건의사항</TabText>
          </TabItem>
        </TabMenus>

        <TabPanel>
          <ProfileTabsTemplate uid={uid} coll={type.letter}/>
        </TabPanel>
        <TabPanel>
          <ProfileTabsTemplate uid={uid} coll={type.suggest} />
        </TabPanel>
      </Tabs>
    </>
  )
}

export default ProfileTabs;