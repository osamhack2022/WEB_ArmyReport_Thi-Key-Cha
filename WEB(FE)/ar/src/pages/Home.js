import "antd/dist/antd.min.css";
import React from 'react';
import Header from '../components/base/Header';
import Whereareyou from '../components/Home/Whereareyou';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

const Home = () => {
  return (
    <Layout className="layout">
      <Header />
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