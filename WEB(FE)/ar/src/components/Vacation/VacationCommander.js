import React, { useMemo, useEffect, useState } from 'react';

import { basiccolumns } from './Tablecolumns';
import { getVacation, setVacation, getId } from './hooks/V_Manager';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { Button, ButtonGroup } from '@mui/material';

let rows = null;
const raw_rows = getVacation().then((test)=>rows = test);

const VacationCommander = () => {
  const [select, setSelect] = useState([]);
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
      select.map((val)=>{
        const uid = getId(val.Name);
        setVacation(uid, false);
      });
    }else{
      select.map((val)=>{
        const uid = getId(val.Name);
        setVacation(uid, true);
      });
      alert("승인하셨습니다!");
    }
  };

  return (
    <>
      <div style={{ height: 600, width: '50%' }}>
        <DataGrid
          rows={rows}
          getRowId={(row)=>row.id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[6]}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelect(newSelection.row);
          }}
        />
      </div>
      <div className="bottom-btns">
        <Button className="left-btn">새로고침</Button>
        <div className="right-btns">
          <ButtonGroup variant="contained">
            <Button value={false} onClick={Submithandle}>반려</Button>
            <Button value={true} onClick={Submithandle}>승인</Button>
          </ButtonGroup>
        </div>
      </div> 
    </>
  )
};

export default VacationCommander;