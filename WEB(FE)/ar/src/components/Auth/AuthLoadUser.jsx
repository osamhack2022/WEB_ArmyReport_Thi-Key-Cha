import React, { useEffect, useState } from 'react';
import AuthLoadBackground from './AuthLoadBackground'
import useHeader from '../base/hooks/useHeader';

const AuthLoadUser = () => {
  const { user } = useHeader();
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    setLoading(true);
    try {
      if (user.uid) {
        setLoading(false);
        window.location.href = '/home';
      } else {
        setLoading(false);
        window.location.href = '/';
      }
      setLoading(false);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadUser();
  }, [])

  return (
    <>
      {loading ? <AuthLoadBackground /> : null}
    </>
  )
}

export default AuthLoadUser;