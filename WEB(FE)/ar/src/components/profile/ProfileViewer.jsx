import React from 'react';
import useHeader from '../base/hooks/useHeader';
import ProfileUserContainer from './ProfileUserContainer'
import ProfileTabs from './ProfileTab'
import Header from '../base/Header'
import Footer from '../base/Footer'

const ProfileViewer = () => {
  const { user } = useHeader();
  const listType = {
    letter: 'post-letters',
    suggest: 'post-suggests'
  }

  return (
    <>
      <Header />
      <ProfileUserContainer user={user.data}/>
      <ProfileTabs type={listType} uid={user.uid}/>
      <Footer />
    </>
  )
}

export default ProfileViewer;