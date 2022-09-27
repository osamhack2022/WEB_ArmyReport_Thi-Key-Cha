import React, { useState } from 'react'
import HomeProfile from '../components/Home/HomeProfile';
import BossMessage from '../components/Home/BossMessage';
import Navigation from '../components/Home/Navigation';

const Home = () => {
  return (
    <>
      <div className='AR_Home_Main_Page'>
        <div className='Nav-bar'>
          <Navigation />
        </div>
        <section className='AR_Home_Profile_Section'>
          <HomeProfile />
        </section>
        <section>
          <BossMessage />
        </section>
      </div>
    </>
  );
};

export default Home;