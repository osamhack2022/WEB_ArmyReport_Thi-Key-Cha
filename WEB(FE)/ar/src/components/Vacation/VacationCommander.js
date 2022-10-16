import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { basiccolumns } from './Tablecolumns';
import OutcastTable from './OutcastTable';

import { getVacation, setVacation, getId } from './hooks/V_Manager';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import { Button, ButtonGroup } from '@mui/material';

const CommandStyle = styled.div`
  .ar-datagrid {  
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 50px;
    width: calc(100%);
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 50px;
  }
  .left-btn{
    margin-left: 50px;
  }
`


let rows = null;
const raw_rows = getVacation().then((test)=>{
  rows = test;
});

const CustomToolbar = () => {
  const gridRef = useGridApiContext();

  const start = new Date();
  const Startday = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
  const end = new Date();
  const Endday = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();

  const [select, setSelect] = useState([]);
  const [user,setUser] = useState({
    Name: '',
    Class : '',
    Destination : '',
    Startdate : Startday,
    Enddate: Endday,
    Content : '',
    Note : '',
  });


  const handleGetData = (e) => {
    e.preventDefault();
    
    console.log(e.target.value);
    const data = gridRef.current.getSelectedRows();
    console.log(data);
    

    let obj = Object.fromEntries(data);
    for (let key of obj.keys()){
      setUser({
        ...user,
          Name: obj[key].Name,
          Class: obj[key].Class,
          Destination : obj[key].Destination,
          Startdate : obj[key].Startdate,
          Enddate : obj[key].Enddate,
          Content : obj[key].Content,
          Note : obj[key].Note
      });
      console.log(user);
      setSelect([
        ...Select,
        user
      ]);
    };

    console.log(select);

    if (e.target.value === false){
      select.map((val)=>{
        const uid = getId(val.Name);
        setVacation(uid, false);
      });
    }else{
      select.map((val)=>{
        const uid = getId(val.Name);
        setVacation(uid, true);
      });
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
          <OutcastTable />
        </div>
        
        <Button 
          variant="contained" 
          color="primary" 
          className="left-btn"
        >
          새로고침
        </Button>
      </CommandStyle>
    </>
  )
};

export default VacationCommander;