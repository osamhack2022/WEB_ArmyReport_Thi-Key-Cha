import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

import './Navigation.module.css';
import { VacationItems } from './MenuItem'

const Navigation = () => {
  const uid = useSelector((state)=>state.User.uid);
  return (
    <>
      <Header>
        <div className="logo">
          <h5>ThiKeyCha</h5>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={VacationItems.map((obj) => {
            const key = index + 1;
            return {
              key,
              label: `${obj.title}`,
            };
          })}
        />
      </Header>
    </>
  )
}

export default Navigation;