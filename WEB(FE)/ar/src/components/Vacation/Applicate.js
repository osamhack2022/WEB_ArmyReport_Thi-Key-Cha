import React, { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import useHeader from '../base/hooks/useHeader';
import { doc, setDoc} from "firebase/firestore";

import db from '../../database/DB_Manager';
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Applicate = () => {
    const user = useHeader();
    const uid = user.uid;

    const [UserData, setUserData] = useState({
        Name : '',
        Class : '',
        Number : '', 
        Destination : '',
        Startdate : new Date(),
        Enddate : new Date(),
        Content : '',
        Note : '',
    });

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);

    /* Reference */
    const DesRef = useRef();
    const StartdateRef = useRef();
    const EnddateRef = useRef();
    const ContentRef = useRef();
    const NoteRef = useRef();

    async function getData(uid){
        const docRef = doc(db,"02155004", "본부중대", "User",`${uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            setUserData({
                Name : docSnap.data().Username,
                Class : docSnap.data().Userclass,
                Number : docSnap.data().PhoneNumber
            });
        }else{
            console.log("No such Data");
        }
    };

    async function setData(uid){
        await setDoc(doc(db,"02155004", "본부중대", "Vacation",`${uid}`),{
            Username : UserData.Name,
            Userclasses : UserData.Class,
            UserPhone : UserData.Number,
            Destination : '',
            Startdate : new Date(),
            Enddate : new Date(),
            Content : '',
            Note : '',
        });
    };

    useEffect(()=>{
        DesRef.current.focus();
        StartdateRef.current.focus();
        EnddateRef.current.focus();
        ContentRef.current.focus();
        NoteRef.current.focus();
        getData(uid);
        setData(uid);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    /* if compnay have Applicate, give the my state information for report my sickness. */

    const onhandleApplicate = async(e) => {
        setLoading(true);
        e.preventDefault();

        setUserData({
            ...UserData,
            [Destination] : DesRef.current.value(),
            [Startdate] : StartdateRef.current.value(),
            [Enddate] : EnddateRef.current.value(),
            [Content] : ContentRef.current.value(),
            [Note] : NoteRef.current.value()
        });

        await setDoc(doc(db, "02155004", "본부중대", "Vacation",`${uid}`), {
            Username : UserData.Name,
            Userclasses : UserData.Class,
            UserPhone : UserData.Number,
            Destination : UserData.Destination,
            Startdate : UserData.Startdate,
            Enddate : UserData.Enddate,
            Content : UserData.Content,
            Note : UserData.Note
        });

        setTimeout(() => {
            setLoading(false);
            alert("보고하였습니다!");
            handleClose();
        }, 1000);
    };

    /* Return the components */

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormControl required>
                        <FormLabel id="demo-controlled-radio-buttons-group">행선지</FormLabel>
                        <TextField id="outlined-basic" inputRef={DesRef} label="ex) 서울 강북, 부산 해운대구" variant="outlined" required/>
                        

                        <FormLabel id="demo-controlled-radio-buttons-group">출발일</FormLabel>
                        <TextField id="outlined-basic" inputRef={StartdateRef} label="ex) 2022년 10월 1일" variant="outlined" required/>
                        
                        <FormLabel id="demo-controlled-radio-buttons-group">도착일</FormLabel>
                        <TextField id="outlined-basic" inputRef={EnddateRef} label="ex) 2022년 10월 5일" variant="outlined" required/>

                        <FormLabel id="demo-controlled-radio-buttons-group">휴가 내용 기입</FormLabel>
                        <TextField id="outlined-basic" inputRef={ContentRef} label="ex) 연가 3일 모범용사 2일" variant="outlined" required/>

                        <FormLabel id="demo-controlled-radio-buttons-group">비고</FormLabel>
                        <TextField id="outlined-basic" inputRef={NoteRef} label="적고 싶은 내용 작성해주세요" variant="outlined" required/>

                        <LoadingButton
                            onClick={onhandleApplicate}
                            loading={loading}
                            loadingIndicator="😎"
                            variant="outlined"
                        >
                            휴가 신청😳
                        </LoadingButton>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
};

export default Applicate;