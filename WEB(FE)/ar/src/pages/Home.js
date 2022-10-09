import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';

import "antd/dist/antd.min.css";
import Navigation from '../components/Navbar/Navigation';
import Whereareyou from '../components/Home/Whereareyou';

import { doc, getDoc } from "firebase/firestore";
import db from '../database/DB_Manager';

import { UserActions } from '../app/UserSlice';
import Patient from '../components/Home/Patient';
import { useSelector } from 'react-redux';
import Commander from '../components/Home/Commander';

const { Content, Footer } = Layout;

const Home = () => {
  const uid = useSelector((state)=>state.User.uid);
  console.log(uid);
  const [rollcall, setRollCall] = useState(false);
  const [Boss, setBoss] = useState(false);
  console.log(Boss);
  async function getData(){
    const docRef = doc(db,"02155004","본부중대","User",`${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
      if(docSnap.data().IsBoss){
        setBoss(docSnap.data().IsBoss);
      }else{
        if (docSnap.data().Timetorollcall){
          setRollCall(true);
        }else{
          console.log("이 사람은 병사입니다 :)");  
        }
      }
      console.log(docSnap.data());
    }else{
      console.log("데이터가 없는데요?");
    }
  }
  useEffect(() => {
    getData(); 
  }, []);

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
      <Content>
        { rollcall && <Patient /> }
        { Boss && <Commander />}
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