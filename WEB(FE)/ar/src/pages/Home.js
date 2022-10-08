import { Layout } from 'antd';
import React from 'react';

import "antd/dist/antd.min.css";
import Navigation from '../components/Navbar/Navigation';
import Whereareyou from '../components/Home/Whereareyou';

import { doc, onSnapshot } from "firebase/firestore";
import db from '../database/DB_Manager';

import { UserActions } from '../app/UserSlice';
import Patient from '../components/Home/Patient';

const { Content, Footer } = Layout;

const Home = () => {
  const uid = useSelector((state)=>state.User.uid);
  const [rollcall, IsRollCall] = useState(false);
  useEffect(async() => {
    await onSnapshot(doc(db, "02155004", "본부중대", "User", `${uid}`), (doc) => {
      if(doc.exist()){
        IsRollCall(doc.data().TimetoRollCall);
      } else{
        console.log("No such Data...");
      }
    });
  });

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
      { rollcall && <Patient /> }
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