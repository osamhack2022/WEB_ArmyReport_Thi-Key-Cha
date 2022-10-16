import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Applicate from './Applicate';
import { getUserVacation } from './hooks/V_Manager';
import styled from '@emotion/styled';
import useHeader from '../base/hooks/useHeader';
import { Typography } from '@mui/material';
import { Button } from 'antd';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    height: 60,
    lineHeight: '60px',
}));


const PersonPage = () => {
    const user = useHeader();
    const uid = user.uid;
        
    const [Userdata, setUserdata] = useState({
        'Startdate' : new Date(),
        'Enddate' : new Date(),
        'Content' : '',
        'Examine' : false
    });
    useEffect(()=>{
        getUserVacation(uid).then((v)=>{
            if (v === 'false'){
                console.log('데이터가 없습니다..ㅠㅠㅠㅠ');
            }else{
                setUserdata(v);
            }
        });
    }, [uid]);
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
                {Userdata.Examine && 
                <>
                    <Item elevation={3}>
                        <Typography variant="h2" gutterBottom>
                            내 휴가
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            출발일 : {Userdata.Startdate}
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            도착일 : {Userdata.Enddate}
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            휴가내용 : {Userdata.Content}
                        </Typography>
                    </Item>
                    <Button onClick={onOpenhandle}>
                        휴가신청!
                        {Open && <Applicate />}
                    </Button>
                </>
                }
                {!Userdata.Examine && 
                <>
                    <Item elevation={3}>
                        <Typography variant="h2" gutterBottom>
                            신청한 휴가가 없습니다..
                        </Typography>
                    </Item>
                    <Button onClick={onOpenhandle}>
                        휴가신청!
                        {Open && <Applicate />}
                    </Button>
                </>
                }
                
            </Box>
        </>
    );
}

export default PersonPage;