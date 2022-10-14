import React, { useEffect, useMemo, useState } from 'react';

import { OutcastColumn } from './Tablecolumns';
import { getVacation, setVacation } from './hooks/V_Manager';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(classes, name, id, content, isarrived,TimeStamp) {
    return {
        classes,
        name,
        id,
        history: [
            {
            Station : '',
            isArrived: false,
            TimeStamp : new Date('0000-00-00 00:00:00'),
            },
        ],
    };
}

function Row(props){
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                {row.name}
                </TableCell>
                <TableCell align="right">{row.classes}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Station Path
                    </Typography>
                    <Table size="small" aria-label="Station">
                        <TableHead>
                        <TableRow>
                            <TableCell>Station</TableCell>
                            <TableCell>IsArrived?</TableCell>
                            <TableCell align="right">TimeStamp</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.history.map((historyRow) => (
                            <TableRow key={historyRow.date}>
                            <TableCell component="th" scope="row">
                                {historyRow.Station}
                            </TableCell>
                            <TableCell>{historyRow.isArrived}</TableCell>
                            <TableCell align="right">{historyRow.TimeStamp}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        classes: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
            Station: PropTypes.string.isRequired,
            isArrived: PropTypes.boolean.isRequired,
            TimeStamp: PropTypes.timestamp.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

const rows = StartToday();

const OutcastTable = (rows) => {
    const columns = useMemo(()=>[
    ], [OutcastColumn]);
    return (
        <>
            <div style={{ height: 300, width: '50%' }}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="right">계급</TableCell>
                            <TableCell>이름</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default OutcastTable;