import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Applicate from './Applicate';
import { getVacation } from './hooks/V_Manager';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));


const PersonPage = () => {
    const [Open, setOpen] = useState(false);
    const onOpenhandle = () => {
        setOpen(Open => !Open);
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: '80%',
                    height: 500,
                    },
                }}
            >            
                <Item elevation={3}>
                    <Typography variant="h2" gutterBottom>
                        내 휴가
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        출발일 : 
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        도착일 :
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        휴가내용 : 
                    </Typography>
                </Item>
                <Button onClick={onOpenhandle}>
                    휴가신청!
                    {Open && <Applicate />}
                </Button>
            </Box>
        </>
    );
}

export default PersonPage;