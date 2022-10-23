import React, { useEffect, useState } from 'react'

import baby_ogu_running from '../../static/image/baby-ogu-running.png'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Applicate from './Applicate';
import { getUserVacation } from './hooks/V_Manager';
import useHeader from '../base/hooks/useHeader';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Button } from 'antd';

const Item = styled(Paper)(({theme}) => ({
    textAlign: 'center',
    height: 60,
    lineHeight: '60px',
}));

const PersonPage = () => {
    const {user} = useHeader();
    const uid = user.uid;
    
    const [IsExamine, setIsExamine] = useState(false);

    useEffect(()=>{
        getUserVacation(uid).then((v)=>{
            if (v === 'false'){
                console.log('데이터가 없습니다..ㅠㅠㅠㅠ');
            }else{
                setIsExamine(v.Examine);
            }
        });
    }, [uid]);

    const [Open, setOpen] = useState(false);
    const onOpenhandle = (e) => {
        setOpen(true);
    }

    return (
        <>
            <Box>
                { IsExamine && 
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
                }
                { !IsExamine && 
                <>
                    <Item elevation={3}>
                        <Typography variant="h2" gutterBottom>
                            신청한 휴가가 없습니다..
                        </Typography>
                        <img
                            src={baby_ogu_running}
                            alt=""
                        />
                    </Item>
                </>
                }
                <Button onClick={onOpenhandle} size="small" sx={{ m:1 }}>
                    휴가신청!
                    {Open && <Applicate onComplete={()=>{
                        setOpen(false);
                    }}/>}
                </Button>
            </Box>
        </>
    );
}

export default PersonPage;