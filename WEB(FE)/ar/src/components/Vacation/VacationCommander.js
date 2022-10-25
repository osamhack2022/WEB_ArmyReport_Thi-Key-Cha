import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { basiccolumns } from './Tablecolumns';
import OutcastTable from './OutcastTable';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StartToday, EndToday, getVacation, setVacation, getId, CombineRows } from './hooks/V_Manager';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridToolbarContainer, useGridApiContext, gridColumnGroupsLookupSelector } from '@mui/x-data-grid';
import { Button, ButtonGroup } from '@mui/material';

const CommandStyle = styled.div`
  .ar-datagrid {  
    box-sizing: border-box;
    display: inline-flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 50px;
    width: calc(40%-100px);
    margin-left: 50px;
    margin-bottom: 140px;
  }
  .ar-outcasttable{
    margin-left: 10px;
    width: calc(20%);
  }
  .left-btn{
    margin-left: 50px;
  }
`

let StartRows = null;
const Startrow = StartToday().then((test)=>{
  console.log(test);
  StartRows = test;
});

let EndRows = null;
const Endrow = EndToday().then((test)=>{
  console.log(test);
  EndRows = test;
});

let rows = null;
const raw_rows = getVacation().then((test)=>{
  console.log(test);
  rows = test;
});

const Refreshhandle = (e) => {
  e.preventDefault();
  const get_rows = getVacation().then((test)=>{
    console.log(test);
    rows = test;
  });
};

const notifyReject = (str) => {
  toast.error(str,{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const notifySucess = (str)=>{
  toast.success(str,{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const notifyStart = (str)=>{
  toast.info(str,{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const CustomToolbar = () => {
  const gridRef = useGridApiContext();
  const start = new Date();
  const Startday = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
  const end = new Date();
  const Endday = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();

  const handleGetData = (e) => {
    e.preventDefault();
    
    let select = [];
    const data = gridRef.current.getSelectedRows();
    
    data.forEach(function(value){
      let user={
        Name: value.Name,
        Class: value.Class,
        Destination : value.Destination,
        Startdate : value.Startdate,
        Enddate : value.Enddate,
        Content : value.Content,
        Note : value.Note
      };
      select.push(user);
    });

    const judge = e.target.value;

    if (judge === "false"){
      console.log("false");
      select.map((val)=>{
        const testing = getId(val.Name).then((uid)=>{
          setVacation(uid[0], false);
        });
      });
      const raw_rows = getVacation().then((test)=>{
        rows = test;
      });
      setTimeout(() => {
        notifyReject("반려하였습니다...");
      }, 750);
    }else if (judge === "true"){
      console.log(true);
      select.map((val)=>{
        const testing = getId(val.Name).then((uid)=>{
          setVacation(uid[0], true);
        });
      });
      getVacation().then((test)=>{
        rows = test;
      });
      setTimeout(() => {
        notifySucess("승인하였습니다!");
      }, 750);
    }else{
      console.log("값을 잘못 입력하였습니다.");
    }
  };



  return (
    <GridToolbarContainer>
      <div className="bottom-btns">
        <div className="right-btns">
          <ButtonGroup variant="contained">
            <Button value={false} onClick={handleGetData}>반려</Button>
            <Button value={true} onClick={handleGetData}>승인</Button>
          </ButtonGroup>
        </div>
      </div> 
    </GridToolbarContainer>
  );
};

const VacationCommander = () => {
  const [Outcast, setOutcast] = useState([]);
  useEffect(()=>{
    setOutcast(CombineRows(StartRows,EndRows).OutcastRows);
  }, []);

  const columns = useMemo(()=>[
    ...basiccolumns,
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 30,
    },
  ], [basiccolumns]);
  
  return (
    <>
      <CommandStyle>
        <div style={{ height: 600, width: '100%' }} className="ar-datagrid">
          <DataGrid
            rows={rows}
            getRowId={(row)=>row.id}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
            components={{
              Toolbar: CustomToolbar,
            }}
          />
          <div className="ar-outcasttable">
            <OutcastTable Rows={Outcast}/>
          </div>
        </div>
        
        <Button 
          variant="contained" 
          color="primary" 
          className="left-btn"
          onClick={Refreshhandle}
        >
          새로고침
        </Button>
      </CommandStyle>
    </>
  )
};

export default VacationCommander;