import React, { useEffect, useState } from 'react';
import Footer from '../components/base/Footer';
import Header from '../components/base/Header';
import db from '../database/DB_Manager';
import { UserActions } from '../app/slice/UserSlice';
import Loading from './Loading';

import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { 
  doc, 
  getDoc, 
  updateDoc, 
  setDoc, 
  getDocs, 
  query,
  collection,
  where
} from "firebase/firestore";
import { useMemo } from 'react';
import { basiccolumns } from '../components/Vacation/Tablecolumns';
import VacationCommander from '../components/Vacation/VacationCommander';
import useHeader from '../components/base/hooks/useHeader';
import { getVacation, setVacation } from '../components/Vacation/hooks/V_Manager';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';

const rows = [
  {
    id : '1',
    Name : '안선우',
    Class : '상병',
    Destination : '경남 김해',
    Startdate : '2022-10-15',
    Enddate : '2022-10-19',
    Content : '연가 5일',
    Note : '집에 너무 가고싶어서 썼습니다.'
  }
];

const Vacation = () => {
  const [isLoad, setisLoad] = useState(true);
  const [Boss, setBoss] = useState(false);
  //const [rows, setRows] = useState([]);
  const { user } = useHeader();
  const uid = user.uid;
  
  const columns = useMemo(()=>[
    ...basiccolumns,
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 30,
    },
  ], [basiccolumns]);

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
  };

  const today = new Date();
  const q = query(collection(db, "02155004", "본부중대", "Vacation"), where("Startdate", ">" , today));
  
  

  function wait1Second(){
    setTimeout(()=>{
      setisLoad(false);
    },1000);
  }
  
  useEffect(() => {
    getData();
    wait1Second();
  },[]);


  return (
    <>
    {isLoad && <Loading />}
    {!isLoad && 
      <Layout className="layout">
        <Header />
        <Content>
          {Boss && 
          <>
          <div style={{ height: 600, width: '50%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[6]}
              checkboxSelection
            />
          </div>
          <div className="bottom-btns">
            <Button className="left-btn">새로고침</Button>
            <div className="right-btns">
              <ButtonGroup variant="contained">
                <Button>반려</Button>
                <Button>승인</Button>
              </ButtonGroup>
            </div>
          </div> 
          </>
        }
          {!Boss && 
          <>
            
          </>
          }
        </Content>
        <Footer />
      </Layout>
    }
    </>
  );
};

export default Vacation;