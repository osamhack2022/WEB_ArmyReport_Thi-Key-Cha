import React, { useEffect, useState } from 'react';

import { useMemo } from 'react';
import { basiccolumns } from './Tablecolumns';
import { getVacation, setVacation } from './hooks/V_Manager';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';

const VacationCommander = (rows) => {
  const columns = useMemo(()=>[
    ...basiccolumns,
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 100,
    },
  ], [basiccolumns]);

  const Submithandle = () => {
    
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
      <div style={{ height: 300, width: '50%' }}>
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
  )
};

export default VacationCommander;