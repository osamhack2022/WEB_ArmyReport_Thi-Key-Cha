import React, { useState } from 'react'
import HomeProfile from './HomeProfile';

const Home = () => {
  
  return (
    <div className='AR_Home_Main_Page'>
      <section className='AR_Home_Profile_Section'>
        <HomeProfile />
      </section>
      <section>
        <BossMessage />
      </section>
    </div>
  );
};

export default Home;