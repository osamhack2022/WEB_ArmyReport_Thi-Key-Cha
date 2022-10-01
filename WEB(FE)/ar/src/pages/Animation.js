import React from 'react'
import Login from '../components/Auth/Login';

import '../components/Auth/Login.module.css';

const Animation = () => {
  return (
    <>
      <div className='AR_Main_Logo'>
      <img 
          src="AR_Logo.png" 
          alt='AR_Logo'
          className="ar-logo-img" 
        />
      </div>
      <section>
        <Login />
      </section>
    </>
  )
}

export default Animation;