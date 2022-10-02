import React from 'react'
import Login from '../components/Auth/Login';

import styles from './Animation.module.css';

const Animation = () => {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.logo_img}>
        <img 
            src="AR_Logo.png" 
            alt='AR_Logo'
            className={styles.logo}
          />
        </div>
        <section className={styles.loginform}>
          <Login />
        </section>
      </div> 
    </>
  )
}

export default Animation;