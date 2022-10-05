import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

import './Navigation.module.css';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const uid = useSelector((state)=>state.User.uid);
  const history = useNavigate();
  const VacationItems = [
    {
        label:'건의사항',
        key : 1
    },
    {
        label: '마음의 편지',
        key : 2
    },
    {
        label: '휴가 중입니다.',
        key : 3
    }
  ];
  return (
    <>
      <Header>
        <div className="logo" value="ThiKeyCha" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={VacationItems.map((obj) => {
            return {
              label: `${obj.label}`,
            };
          })}
        />
      </Header>
    </>
  )
}

export default Navigation;