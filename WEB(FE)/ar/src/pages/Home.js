import { Layout } from 'antd';
import React from 'react';
const { Content, Footer } = Layout;
import "antd/dist/antd.min.css";
import Navigation from '../components/Navbar/Navigation';
import Whereareyou from '../components/Home/Whereareyou';

const Home = () => {

  return (
    <Layout className="layout">
      <Navigation />
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <div className="site-layout-content">
          <Whereareyou />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        @ ThiKeyCha Army-Report All rights reserved.
      </Footer>
    </Layout>
  );
}

export default Home;