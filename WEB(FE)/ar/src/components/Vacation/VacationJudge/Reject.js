import React from 'react'

import { Paper } from '@mui/material';
import { Typography } from 'antd';

const Reject = () => {
    return (
        <>
            <Paper elevation={3}>
                <Typography variant="h6" color="primary" gutterBottom>
                    거절되었습니다.
                </Typography>
                <Typography variant="body1">
                    사유 : 
                </Typography>
            </Paper>
        </>
    )
}

export default Reject