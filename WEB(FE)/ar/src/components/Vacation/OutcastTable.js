import React from 'react'
import { StartToday, EndToday } from './hooks/V_Manager';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { OutcastColumn } from './Tablecolumns';

let StartRows = null;
const Startrow = StartToday().then((test)=>{
  console.log(test);
  StartRows = test;
});

let EndRows = null;
const Endrow = EndToday().then((test)=>{
  console.log(test);
});

const columns = OutcastColumn;

const OutcastTable = () => {
  return (
    <DataGrid
      sx={{ m : 2 }}
      rows={StartRows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
  )
};

export default OutcastTable;