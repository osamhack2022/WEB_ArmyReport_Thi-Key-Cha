import React from 'react';
import useHeader from '../components/base/hooks/useHeader';
import ProfileViewer from '../components/profile/ProfileViewer'

const ProfilePage = () => {
  const { user } = useHeader();
  
  return (
    <>
      <ProfileViewer data={user.data}/>
    </>
  )
}

export default ProfilePage;