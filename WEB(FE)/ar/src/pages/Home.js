import "antd/dist/antd.min.css";
import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import { Layout } from 'antd';

const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="layout">
      <Header />
      <Content
        style={{
          padding: '0 50px',
        }}
      >
      </Content>
      <Footer />
    </Layout>
  );
}

export default Home;