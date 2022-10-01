import React, { useState } from 'react';
import Navigation from '../components/Navbar/Navigation';
import VacationPath from '../components/Vacation/VacationPath';
import VacationInfo from '../components/Vacation/VacationPath';

const Vacation = () => {
  
  return (
    <>
      <div className="body">
        <div className="nav-bar">
          <Navigation />
        </div>
        <section className='vacation-info'>
          <VacationInfo />
        </section>
        <section className="vacation-path">
          <VacationPath />
        </section>
      </div>
    </>
  )
};

export default Vacation;