import React, { useEffect, useRef, useState } from 'react'


import Applicate from './Applicate';
import { getUserVacation } from './hooks/V_Manager';

import Box from '@mui/material/Box';
import useHeader from '../base/hooks/useHeader';
import Button from '@mui/material/Button';

import { useDetectClickOutside } from 'react-detect-click-outside';

import Approve from './VacationJudge/Approve';
import Reject from './VacationJudge/Reject';
import Pending from './VacationJudge/Pending';
import NotApplicate from './VacationJudge/NotApplicate';
import styled from 'styled-components';

const DesignPerson = styled.div`

`;

const PersonPage = () => {
    const {user} = useHeader();
    const uid = user.uid;
    
    const [IsApplicate, setIsApplicate] = useState(false);
    const [IsExamine, setIsExamine] = useState(false);
    const [IsPositive, setIsPositive] = useState(false);

    const [UserInfo, setUserInfo] = useState({
        'Startdate' : new Date(),
        'Enddate' : new Date(),
        'Content' : '',
    });

    useEffect(()=>{
        getUserVacation(uid).then((v)=>{
            if (v === 'false'){
                setIsApplicate(false);
            }else{
                if(v.Positive === false || v.Positive === true){
                    setUserInfo({
                        'Startdate' : v.Startdate,
                        'Enddate' : v.Enddate,
                        'Content' : v.Content,
                    })
                    setIsApplicate(true);
                    setIsExamine(v.Examine);
                    setIsPositive(v.Positive);
                }else{
                    setUserInfo({
                        'Startdate' : v.Startdate,
                        'Enddate' : v.Enddate,
                        'Content' : v.Content,
                    })
                    setIsApplicate(true);
                    setIsExamine(v.Examine);
                }
            }
        });
    }, [uid]);

    const [Open, setOpen] = useState(false);
    const onOpenhandle = (e) => {
        setOpen(true);
    }

    return (
        <div>
            <Box>
                { IsApplicate && 
                <>
                    { IsExamine && 
                    <>
                        { IsPositive &&
                            <Approve user={UserInfo}/>
                        }
                        { !IsPositive &&
                            <Reject />
                        }
                    </>
                    }
                    { !IsExamine && 
                        <Pending user={UserInfo}/>
                    }
                </>
                }
                { !IsApplicate &&
                    <NotApplicate />
                }
                <Button  onClick={onOpenhandle} variant="contained">
                    휴가신청
                    {Open && <Applicate  onComplete={()=>{
                        setOpen(false);
                    }}/>}
                </Button>
            </Box>
        </div>
    );
}

export default PersonPage;