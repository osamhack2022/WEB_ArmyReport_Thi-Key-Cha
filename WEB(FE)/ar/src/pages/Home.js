import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
const { Header, Content, Footer } = Layout;

import Navigation from '../components/Navbar/Navigation';

const Home = () => {
  return (
    <Layout className="layout">
      <Navigation />
      
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default Home;