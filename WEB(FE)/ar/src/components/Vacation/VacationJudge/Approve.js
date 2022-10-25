import React, { useState } from 'react';

import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from 'antd';

const Approve = ( {user} ) => {
    const [User, setUser] = useState({user});
    return (
        <>
            <Paper elevation={3}>
                <Typography variant="h6" color="primary" gutterBottom>
                    승인되었습니다.
                </Typography>
                <Typography variant="body1">
                    휴가 출발일 : {User.Startdate}
                </Typography>
                <Typography variant="body1">
                    휴가 복귀일 : {User.Enddate}
                </Typography>
            </Paper>
        </>
    )
}

export default Approve;