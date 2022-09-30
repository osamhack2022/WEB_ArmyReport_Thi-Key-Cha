import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import ProductNavBar from './ProductNavBar';
import UserActions from '../../app/UserSlice';

import { VacationItems, CalenderItems } from './MenuItem'

const Navigation = () => {
  const uid = useSelector((state)=>state.User.uid);

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960){
      setDropdown(false);
    }else{
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960){
      setDropdown(false);
    } else{
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className="nav-bar">
        <Link to={`/:${uid}`} className='nav-bar-home' onClick={closeMobileMenu}>
          <div className='nav-bar-home'>
            <h3 className='nav-bar-logo'>ThiKeyCha</h3>
          </div>
        </Link>
      </nav>
      <ul className={click ? 'nav-menu-active' : 'nav-menu'}>
        <li  
          className='nav-item'
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <h4 className='nav-item-calender-text'>캘린더</h4>
          {dropdown && <ProductNavBar props={CalenderItems}/>}
        </li>
      </ul>
      <ul className={click ? 'nav-menu-active' : 'nav-menu'}>
        <li  
          className='nav-item'
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <h4 className='nav-item-calender-text'>군인이 죄인가</h4>
          {dropdown && <ProductNavBar props={VacationItems}/>}
        </li>
      </ul>
    </>
  )
}

export default Navigation;