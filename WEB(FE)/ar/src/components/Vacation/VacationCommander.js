import React, { useMemo, useEffect, useState } from 'react';

import { basiccolumns } from './Tablecolumns';
import { getVacation, setVacation } from './hooks/V_Manager';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { Button, ButtonGroup } from '@mui/material';


const rows = getVacation();
console.log(rows);

const VacationCommander = () => {
  const columns = useMemo(()=>[
    ...basiccolumns,
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 30,
    },
  ], [basiccolumns]);

  const Submithandle = (e) => {
    e.preventDefault();
    if (e.target.value === false){
      setVacation('admin', false); // admin 자리에 폰번호를 통해 uid 를 알아내야됨.
      
    }else{
      setVacation('admin', true);
      alert("승인하셨습니다!");
    }
  };

  return (
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
            <Button value={false} onClick={Submithandle}>반려</Button>
            <Button value={false} onClick={Submithandle}>승인</Button>
          </ButtonGroup>
        </div>
      </div> 
    </>
  )
};

export default VacationCommander;