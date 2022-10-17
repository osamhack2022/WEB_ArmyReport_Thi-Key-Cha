const moment = require('moment');

export const basiccolumns = [
    { field: 'id', headerName: 'No', width: 20, flex: 1 },
    { field: 'Class', headerName: '계급', width: 50, flex: 1 },
    { field: 'Name', headerName: '이름', width: 100,flex: 1 },
    { field: 'Destination', headerName: '목적지', width: 130 },
    {
      field: 'Startdate',
      type: 'date',
      headerName: '출발일',
      width: 180,
      valueFormatter: params => 
        moment(params?.value).format("YYYY-MM-DD"),
    },
    {
      field: 'Enddate',
      type: 'date',
      headerName: '도착일',
      width: 180,
      valueFormatter: params => 
        moment(params?.value).format("YYYY-MM-DD"),
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

export const OutcastColumn = [
  { field: 'Away', headerName: '금일 휴가 출발자', width: 70,flex: 1 },
  { field: 'Home', headerName: '금일 휴가 복귀자', width: 70,flex: 1 },
]