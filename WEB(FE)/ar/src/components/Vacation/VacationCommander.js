import React from 'react';

import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { getVacation, setVacation } from './hooks/V_Manager';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const basiccolumns = [
  { field: 'Class', headerName: '계급', width: 70 },
  { field: 'Name', headerName: '이름', width: 130 },
  { field: 'Destination', headerName: '목적지', width: 130 },
  {
    field: 'Startdate',
    headerName: '출발일',
    type: 'Date',
    width: 90,
  },
  {
    field: 'Enddate',
    headerName: '도착일',
    type: 'Date',
    width: 90,
  },
  {
    field: 'Content',
    headerName: '휴가 내용',
    sortable: false,
    width: 160,
  },
  {
    field: 'Note',
    headerName: '비고',
    sortable: false,
    width: 160,
  },
];

const VacationCommander = () => {
  const rows = getVacation();
  const columns = useMemo(()=>[
    ...basiccolumns,
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 100,
    },
  ], [basiccolumns]);

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
            <Button>반려</Button>
            <Button>승인</Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  )
};

export default VacationCommander;