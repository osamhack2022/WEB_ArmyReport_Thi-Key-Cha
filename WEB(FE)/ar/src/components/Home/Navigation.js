import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <nav>
        <div>
          <NavLink to='/'>
            <img src="" alt="" />
          </NavLink>
          <div>
            <NavLink to='/Calender'>
              캘린더
            </NavLink>
          </div>
          <div>
            <NavLink to='/Vacation'>
              군인이 죄인가
            </NavLink>
          </div>
          <div>
            <NavLink to='/'>
              나는 한 부대의 지휘관이다.
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation;