import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import ProductNavBar from './ProductNavBar';
import UserActions from '../../app/UserSlice';

const Navigation = () => {
  const uid = useSelector((state)=>state.User.uid);

  const CalenderList = [
    {title : "부대 일정 종합", items : `/Calender/ArmyUnit` },
    {title : "부대 휴가 일정", items : `/Calender/${uid}/vacation`},
  ];
  console.log(CalenderList[0].title);
  return (
    <>
      <nav className="nav-bar">
        <div className="nav-bar-containers">
          <div className="thi-key-cha-logo">
            <li className="dropdown">
              <Link to={`/:${uid}`}>
                <h3 className="nav-bar-text-home">ThiKeyCha</h3>
              </Link>
              <div className="dropDownMenu">
                {
                  CalenderList.map(list => (
                    <ProductNavBar title={list.title} items={list.items} />
                ))}
              </div>
            </li>
          </div>
          <div>
            <h4 className="nav-bar-unit-text">캘린더</h4>
          </div>
          <div>
            <NavLink to='/Vacation'>
              <h4 className="nav-bar-unit-text">군인이 죄인가</h4>
            </NavLink>
          </div>
          <div>
            <NavLink to='/'>
              <h4 className="nav-bar-unit-text">나는 한 부대의 지휘관이다.</h4>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation;