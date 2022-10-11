export const basiccolumns = [
    { field: 'ID', headerName: 'No', width: 60 },
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