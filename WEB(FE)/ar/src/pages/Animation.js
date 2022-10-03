import React from 'react'
import Login from '../components/Auth/Login';

const Animation = () => {
  return (
    <>
      <div className='body'>
        <div className='logo'>
        <img 
            src="AR_Logo.png" 
            alt='AR_Logo'
            className='logoimg'
          />
        </div>
        <section className='loginform'>
          <Login />
        </section>
      </div> 
    </>
  )
}

export default Animation;