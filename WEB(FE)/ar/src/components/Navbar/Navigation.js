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
        <div className="logo" value="ThiKeyCha" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={VacationItems.map((obj) => {
            return {
              label: `${obj.title}`,
              link : `${obj.path}`,
            };
          })}
        />
      </Header>
    </>
  )
}

export default Navigation;