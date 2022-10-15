import React from 'react';
import useHeader from '../base/hooks/useHeader';
import ProfileUserContainer from './ProfileUserContainer'
import ProfileTabs from './ProfileTabs'
import Header from '../base/Header'
import Footer from '../base/Footer'

const ProfileViewer = () => {
  const { user } = useHeader();

  return (
    <>
      <Header />
      <ProfileUserContainer data={user.uid}/>
      <ProfileTabs />
      <Footer />
    </>
  )
}

export default ProfileViewer;