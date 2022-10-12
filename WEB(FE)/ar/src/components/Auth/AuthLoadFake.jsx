import React, { useEffect } from 'react';
import { useState } from 'react';
import AuthLoadBackground from './AuthLoadBackground'

const AuthLoadFake = () => {
  const [loading, setLoaidng] = useState(true);

  const FakeLoading = async () => {
    setLoaidng(true);
    await new Promise((delay) => {
      setTimeout(delay, 1500)
    });
    setLoaidng(false);

    return false;
  }

  useEffect(() => {
    FakeLoading()
  }, [])

  return (
    <>
      {loading ? <AuthLoadBackground /> : null}
    </>
  )
}

export default AuthLoadFake;