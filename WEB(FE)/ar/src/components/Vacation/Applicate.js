import React, { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import useHeader from '../base/hooks/useHeader';
import { doc, getDoc, setDoc} from "firebase/firestore";

import db from '../../database/DB_Manager';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import moment from 'moment';

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



const Applicate = ({ onComplete }) => {
    const {user} = useHeader();
    const userid = user.uid;

    const [Startvalue, setStartvalue] = useState(moment(new Date(),"YYYY-MM-DD"));
    const [Endvalue, setEndvalue] = useState(moment(new Date(),"YYYY-MM-DD"));

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

    useEffect(()=>{
        setData(userid);
    }, []);

    async function getData(userid){
        const docRef = doc(db,"02155004", "본부중대", "User",`${userid}`);
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

    async function setData(userid){
        await setDoc(doc(db,"02155004", "본부중대", "Vacation",`${userid}`),{
            Name : UserData.Name,
            Class : UserData.Class,
            UserPhone : UserData.Number,
            Destination : '',
            Startdate : new Date(),
            Enddate : new Date(),
            Content : '',
            Note : '',
            Examine : false,
        });
    };

    const onChange = (e) => {
        console.log(e);
        const {
            target : {name, value}
        } = e;

        setUserData({
            ...UserData,
            [name] : value,
        });
    }

    const StarthandleChange = (Value) => {
        
        console.log(Value);
        setStartvalue(Value);
    };

    const EndhandleChange = (Value) => {
        setEndvalue(Value);
        console.log(Value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* if compnay have Applicate, give the my state information for report my sickness. */

    const onhandleApplicate = async(e) => {
        getData(userid);
        setLoading(true);
        e.preventDefault();
        console.log(Startvalue);
        console.log(Endvalue);
        await setDoc(doc(db, "02155004", "본부중대", "Vacation",`${userid}`), {
            Name : UserData.Name,
            Class : UserData.Class,
            UserPhone : UserData.Number,
            Destination : UserData.Destination,
            Startdate : Startvalue,
            Enddate : Endvalue,
            Content : UserData.Content,
            Note : UserData.Note,
            Examine: false,
        });

        setTimeout(() => {
            setLoading(false);
            alert("보고하였습니다!");
            onComplete();
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
                        <TextField name="Destination" inputRef={DesRef} label="ex) 서울 강북, 부산 해운대구" variant="outlined" onChange={onChange} required/>
                        
                        <Stack spacing={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    renderInput={(params) => <TextField {...params} name="startdate"/>}
                                    label="출발일"
                                    inputFormat="YYYY/MM/DD"
                                    value={Startvalue}
                                    onChange={StarthandleChange}
                                />
                            </LocalizationProvider>
                
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    renderInput={(params) => <TextField {...params} name="startdate"/>}
                                    label="도착일"
                                    inputFormat="YYYY/MM/DD"
                                    value={Endvalue}
                                    onChange={EndhandleChange}
                                />
                            </LocalizationProvider>
                        </Stack>
                        
                        <FormLabel id="demo-controlled-radio-buttons-group">휴가 내용 기입</FormLabel>
                        <TextField name="Content" inputRef={ContentRef} label="ex) 연가 3일 모범용사 2일" variant="outlined" onChange={onChange} required/>

                        <FormLabel id="demo-controlled-radio-buttons-group">비고</FormLabel>
                        <TextField name="Note" inputRef={NoteRef} label="적고 싶은 내용 작성해주세요" variant="outlined" onChange={onChange} required/>

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