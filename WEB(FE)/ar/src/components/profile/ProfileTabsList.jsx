import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';

import IconEdit from '../../static/svg/icon-edit.svg'
import IconTrash from '../../static/svg/icon-trash.svg'

const Icon = styled.img`
  width: 100%;
  cursor: pointer;
`;


const Cell = styled(TableCell)`
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;

  .btn-modify {
    width: 24px;
    margin-right: 14px;
  }
  
  .btn-remove {
    width: 20px;
  }
`

const ProfileTabsList = ({list, uid, onDelete, onUpdate}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <Cell align="center">이름</Cell>
              <Cell align="right">내용</Cell>
              <Cell align="right">날짜</Cell>
              <Cell align="right"></Cell>
              <Cell align="center"></Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              row.hidden === false &&
              row.userId === uid &&
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <Cell component="th" scope="row" align="center">
                  {row.username}
                </Cell>
                <Cell align="right">{row.content}</Cell>
                <Cell align="right">{row.created_at}</Cell>
                <Cell align="right">{row.attacker ?? row.attacker}</Cell>
                <Cell align="center">
                  {/* <Icon className='btn-modify' src={IconEdit} alt="수정" onClick={(e) => {onUpdate}} /> */}
                  <Icon className='btn-remove' src={IconTrash} alt="삭제" onClick={(e) => {onDelete(e, row.id)}} />
                </Cell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ProfileTabsList;