import React, { useEffect, useState } from 'react';

import { CallLocdata } from '../components/Home/hooks/HomeValue';
import useHeader from '../components/base/hooks/useHeader';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Patient from '../components/Home/Patient';
import Commander from '../components/Home/Commander';
import Whereareyou from '../components/Home/Whereareyou';
import AuthLoadBackground from '../components/Auth/AuthLoadBackground';

import db from '../database/DB_Manager';
import { UserActions } from '../app/slice/UserSlice';

import { onSnapshot, doc, getDoc, query, getDocs, collection, where } from "firebase/firestore";

import "antd/dist/antd.min.css";
import { Layout } from 'antd';

const { Content } = Layout;


const Home = () => {
  const [isLoad, setIsLoad] = useState(true);
  const { user } = useHeader();
  const uid = user.uid;
  const [rollcall, setRollCall] = useState(false);
  const [Boss, setBoss] = useState(false);


  const unsub = onSnapshot(doc(db,"02155004", "본부중대", "User",`${uid}`), (doc) => {
    setRollCall(doc.data().Timetorollcall);
  });

  async function getData(){
    const docRef = doc(db,"02155004","본부중대","User",`${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
      if(docSnap.data().IsBoss){
        setBoss(docSnap.data().IsBoss);
      }
    }else{
      console.log("데이터가 없는데요?");
      unsub();
    }
  };

  
  

  function wait1Second(){
    setTimeout(()=>{
      setIsLoad(false);
    },1000);
  };

  useEffect(() => {
    getData();
    wait1Second();
  }, []);

  return (
    <>
      {!isLoad &&
      <>
        <Layout className="layout">
          <Header />
          <Content>
            { !Boss && 
            <>
              <Content
              style={{
                padding: '0 50px',
              }}
            >
              <div className="site-layout-content">
                <Whereareyou />
              </div>
              </Content>
              { rollcall && <Patient /> }
            </>
            }
            { Boss && <Commander />}
          </Content>
          <Footer />
        </Layout>
      </>
      }
      {isLoad && <AuthLoadBackground />}
    </>
    
  );
}

export default Home;