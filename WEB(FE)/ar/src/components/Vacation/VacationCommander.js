import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { basiccolumns } from './Tablecolumns';
import OutcastTable from './OutcastTable';

import { getVacation, setVacation, getId } from './hooks/V_Manager';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridToolbarContainer, useGridApiContext, gridColumnGroupsLookupSelector } from '@mui/x-data-grid';
import { Button, ButtonGroup } from '@mui/material';

const CommandStyle = styled.div`
  .ar-datagrid {  
    box-sizing: border-box;
    display: flex;
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

  const handleGetData = (e) => {
    e.preventDefault();
    let select = [];
    const data = gridRef.current.getSelectedRows();
    
    data.forEach(function(value, key){
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
    
    if (e.target.value === false){
      select.map((val)=>{
        const testing = getId(val.Name).then((uid)=>{
          setVacation(uid, false);
        });
      });
      setTimeout(() => {
        alert("반려하였습니다.");
      }, 750);
    }else{
      select.map((val)=>{
        const testing = getId(val.Name).then((uid)=>{
          setVacation(uid, true);
        });
      });
      setTimeout(() => {
        alert("승인하였습니다!");
      }, 750);
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
          <div className="ar-outcasttable">
            <OutcastTable />
          </div>
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