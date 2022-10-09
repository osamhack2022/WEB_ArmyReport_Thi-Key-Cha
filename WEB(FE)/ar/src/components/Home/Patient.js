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

const Patient = () => {
    /* Variables */
    const uid = useSelector((state)=>state.User.uid);

    const [loading, setLoading] = useState(false);
 
    const [patient, setPatient] = useState(false);
    const [absent, setAbsent] = useState(false);
    const [islastlight, setIslastlight] = useState(false);

    const [open, setOpen] = useState(true);

    /* Reference */
    const patientRef = useRef();
    const absentRef = useRef();
    const lastlightRef = useRef();

    async function setData(uid){
        await setDoc(doc(db,"02155004", "본부중대", "RollCall",`${uid}`),{
            Uniqueness : false,
            Symptom : "",
            Isabsent : false,
            Reason : "",
            Islastlight : false,
            Content : ""
        });
    };

    useEffect(()=>{
        setData(uid);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.name === "patient-radio-button"){
            setPatient(e.target.value);
        }
        if(e.target.name === "absent-radio-button"){
            setAbsent(e.target.value);
        }
        if(e.target.name === "lastlight-radio-button"){
            setIslastlight(e.target.value);
        }
    };

    /* if compnay have Patient, give the my state information for report my sickness. */

    const onhandlePatient = async(e) => {
        setLoading(true);
        e.preventDefault();

        const Uniqueness = patient;
        let Symptom = "";
        if (Uniqueness === true){
            Symptom = patientRef.current.value;            
        }
        
        const Isabsent = absent;
        let Reason = "";
        if (Isabsent === true){
            Reason = absentRef.current.value;
        }
        
        let Content = "";
        const Islastlight = islastlight;
        if (Islastlight === true) {
            Content = lastlightRef.current.value;
        }

        await setDoc(doc(db, "02155004", "본부중대", "RollCall",`${uid}`), {
            Uniqueness : Uniqueness,
            Symptom : Symptom,
            Isabsent : Isabsent,
            Reason : Reason,
            Islastlight : Islastlight,
            Content : Content
        });

        setTimeout(() => {
            setLoading(false);
            alert("보고하였습니다!");
            handleClose();
        }, 1000);

        setPatient(false);
        setAbsent(false);
        setIslastlight(false);
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
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">아픈 곳 있나요?</FormLabel>
                        <RadioGroup
                            aria-labelledby='demo-controlled-radio-buttons-group'
                            name="patient-radio-button"
                            value={patient}
                            onChange={handleChange}
                        >
                            <FormControlLabel control={<Radio />} label="Yes" value={true}/>
                            <FormControlLabel control={<Radio />} label="No" value={false}/>
                        </RadioGroup>
                        { patient && <TextField id="outlined-basic" inputRef={patientRef} label="어디가 아픈가요?" variant="outlined" required/> }
                        { !patient && <TextField id="outlined-basic" inputRef={patientRef} label="어디가 아픈가요?" variant="outlined" disabled/> }
                        <FormLabel id="demo-controlled-radio-buttons-group">점호 열외하십니까?</FormLabel>
                        <RadioGroup
                            aria-labelledby='demo-controlled-radio-buttons-group'
                            name="absent-radio-button"
                            value={absent}
                            onChange={handleChange}
                        >
                            <FormControlLabel control={<Radio />} label="Yes" value={true} />
                            <FormControlLabel control={<Radio />} label="No" value={false} />
                        </RadioGroup>
                        { absent && <TextField id="outlined-basic" inputRef={absentRef} label="왜 열외하시나요?" variant="outlined" required/> }
                        { !absent && <TextField id="outlined-basic" inputRef={absentRef} label="왜 열외하시나요?" variant="outlined" disabled/> }
                        <FormLabel id="demo-controlled-radio-buttons-group">연등하시나요?</FormLabel>
                        <RadioGroup
                            aria-labelledby='demo-controlled-radio-buttons-group'
                            name="lastlight-radio-button"
                            value={islastlight}
                            onChange={handleChange}
                        >
                            <FormControlLabel control={<Radio />} label="Yes" value={true} />
                            <FormControlLabel control={<Radio />} label="No" value={false} />
                        </RadioGroup>
                        { islastlight && <TextField id="outlined-basic" inputRef={lastlightRef} label="무슨 연등하시나요?" variant="outlined" required/> }
                        { !islastlight && <TextField id="outlined-basic" inputRef={lastlightRef} label="무슨 연등하시나요?" variant="outlined" disabled/> }
                        <LoadingButton
                            onSubmit={onhandlePatient}
                            loading={loading}
                            loadingIndicator="🤔"
                            variant="outlined"
                            >
                            보고💋
                        </LoadingButton>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
};

export default Patient;