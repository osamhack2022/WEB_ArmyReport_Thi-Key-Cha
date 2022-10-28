import React from 'react'

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { OutcastColumn } from './Tablecolumns';

const columns = OutcastColumn;

const OutcastTable = ({Rows}) => {
  return (
    <DataGrid
      sx={{ m : 2 }}
      rows={Rows}
      getRowId={(row)=>row.id}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
  )
};

export default OutcastTable;