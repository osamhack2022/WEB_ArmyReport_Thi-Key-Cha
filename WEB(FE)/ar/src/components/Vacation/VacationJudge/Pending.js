import React, { useState } from 'react'

import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Pending = ({user}) => {
    const [User, setUser] = useState({user});
    return (
        <>
            <Box
                sx={{
                    p: 1,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 1,
                }}
            >
                <Paper elevation={3}>
                    <Typography variant="h3" align='center' gutterBottom>
                        내 휴가
                    </Typography><br/>
                </Paper> 
                <Paper>
                    <Typography variant="h4" align='center' gutterBottom>
                        출발일 : {User.Startdate}
                    </Typography><br/>
                </Paper>
                <Paper>
                    <Typography variant="h4" align='center' gutterBottom>
                        도착일 : {User.Enddate}
                    </Typography><br/>
                </Paper>
                <Paper>
                    <Typography variant="h4" align='center' gutterBottom>
                        휴가내용 : {User.Content}
                    </Typography>
                </Paper>
            </Box>
            
        </>
    )
}

export default Pending;