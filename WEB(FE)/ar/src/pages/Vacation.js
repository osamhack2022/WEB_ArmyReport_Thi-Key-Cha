import React, { useEffect, useState } from 'react';
import Footer from '../components/base/Footer';
import Header from '../components/base/Header';
import db from '../database/DB_Manager';
import { UserActions } from '../app/slice/UserSlice';

import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { onSnapshot, doc, getDoc } from "firebase/firestore";
import VacationCommander from '../components/Vacation/VacationCommander';

const Vacation = () => {
  const [Boss, setBoss] = useState(false);
  console.log(Boss);
  const { user } = useHeader();
  const uid = user.uid;
  console.log(uid);
  
  async function getData(){
  const docRef = doc(db,"02155004","본부중대","User",`${uid}`);
  const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
      if(docSnap.data().IsBoss){
          setBoss(docSnap.data().IsBoss);
      }
    }else{
    console.log("데이터가 없는데요?");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout className="layout">
      <Header />
      <Content>
        {Boss && <VacationCommander />}
        {! Boss && 
        <>
          Sorry, Close on time.
        </>
        }
      </Content>
      <Footer />
    </Layout>
  );
};

export default Vacation;