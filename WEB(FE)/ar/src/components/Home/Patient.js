import React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { doc, setDoc} from "firebase/firestore";

import db from '../../database/DB_Manager';

const Patient = () => {
    /* Variables */
    const uid = useSelector((state)=>state.User.uid);

    const [loading, setLoading] = useState(false);
 
    const [patient, setPatient] = useState(true);
    const [absent, setAbsent] = useState(true);
    const [islastlight, setIslastlight] = useState(true);

    const [open, setOpen] = useState(true);

    /* Reference */
    const patientbtnRef = useRef();
    const absentbtnRef = useRef();
    const lastlightbtnRef = useRef();
    const patientRef = useRef();
    const absentRef = useRef();
    const lastlightRef = useRef();

    useEffect(async()=>{
        patientbtnRef.current.focus();
        absentbtnRef.current.focus();
        lastlightbtnRef.current.focus();
        patientRef.current.focus();
        absentRef.current.focus();
        lastlightRef.current.focus();
        
        await setDoc(doc(db, "02155004", "본부중대", "RollCall",`${uid}`), {
            Uniqueness : false,
            Symptom : "",
            Isabsent : false,
            Reason : "",
            Islastlight : false,
            Content : ""
        });
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.name === "patient-radio-button"|| e.target.value === 'Yes'){
            setPatient(true);
        }else if(e.target.name === "patient-radio-button" || e.target.value === 'No'){
            setPatient(false);
        }else if(e.target.name === "absent-radio-button" || e.target.value === 'Yes'){
            setAbsent(true);
        }else if(e.target.name === "absent-radio-button" || e.target.value === 'No'){
            setAbsent(false);
        }else if(e.target.name === "lastlight-radio-button" || e.target.value === 'Yes'){
            setIslastlight(true);
        }else if(e.target.name === "lastlight-radio-button" || e.target.value === 'No'){
            setIslastlight(false);
        }
    };

    /* if compnay have Patient, give the my state information for report my sickness. */

    const onhandlePatient = async(e) => {
        setLoading(true);
        e.preventDefault();

        const Uniqueness = patient;
        const Symptom = patientRef.current.value;

        const Isabsent = absent;
        const Reason = absentRef.current.value;
        
        const Islastlight = islastlight;
        const Content = lastlightRef.current.value;

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
        }, 1000);
    };

    /* Return the components */

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
            >
                <Box>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">아픈 곳 있나요?</FormLabel>
                        <RadioGroup
                            aria-labelledby='demo-controlled-radio-buttons-group'
                            name="patient-radio-button"
                            value={patient}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Yes" control={<Radio inputRef={patientbtnRef} />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio inputRef={patientbtnRef} />} label="No" />
                        </RadioGroup>
                        { patient && <TextField id="outlined-basic" inputRef={patientRef} label="어디가 아픈가요?" variant="outlined"/> }

                        <FormLabel id="demo-controlled-radio-buttons-group">점호 열외하십니까?</FormLabel>
                        <RadioGroup
                            aria-labelledby='demo-controlled-radio-buttons-group'
                            name="absent-radio-button"
                            value={absent}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Yes" control={<Radio inputRef={absentbtnRef} />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio inputRef={absentbtnRef} />} label="No" />
                        </RadioGroup>
                        { absent && <TextField id="outlined-basic" inputRef={absentRef} label="왜 열외하시나요?" variant="outlined"/> }
                        
                        <FormLabel id="demo-controlled-radio-buttons-group">연등하시나요?</FormLabel>
                        <RadioGroup
                            aria-labelledby='demo-controlled-radio-buttons-group'
                            name="lastlight-radio-button"
                            value={islastlight}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Yes" control={<Radio inputRef={lastlightbtnRef} />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio inputRef={lastlightbtnRef} />} label="No" />
                        </RadioGroup>
                        { islastlight && <TextField id="outlined-basic" inputRef={lastlightRef} label="무슨 연등하시나요?" variant="outlined"/> }

                        <LoadingButton
                            onClick={onhandlePatient}
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