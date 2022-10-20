import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components'
import ProfileSuggestsList from './ProfileSuggestsList'

const TabMenus = styled(TabList)`
  text-align: center;
  list-style: none;
`

const TabItem = styled(Tab)`
  float: left;
  padding: 1.2rem;
  font-size: 24px;
  font-weight: 400;
  cursor: pointer;
`

const ProfileTabs = () => {
  return (
    <>
    <Tabs>
      <TabMenus>
        <TabItem>
          <a href="javascript:void(0)">마음의 편지</a>
        </TabItem>
        <TabItem>
          <a href="javascript:void(0)">건의사항</a>
        </TabItem>
      </TabMenus>

      <TabPanel>
        <ProfileSuggestsList />
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
    </>
  )
}

export default ProfileTabs;