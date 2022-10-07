import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import UserActions from "../../app/UserSlice";
import { getDatabase, ref, set } from "firebase/database";

import { doc, setDoc } from "firebase/firestore";

function writeUserData(userId, Uniqueness, Symptom, Isabsent, Reason, Islastlight, Content) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      Uniqueness : Uniqueness,
      Symptom : Symptom,
      Isabsent : Isabsent,
      Reason : Reason,
      Islastlight : Islastlight,
      Content : Content
    });
};

const Patient = () => {
    /* Variables */
    const uid = useSelector((state)=>state.User.uid);
    const Username = useSelector((state)=>state.User.UserObj.UserName);
    const Userclasses = useSelector((state)=>state.User.UserObj.Classes);

    const [patient, setPatient] = useState(true);
    const [absent, setAbsent] = useState(true);
    const [islastlight, setIslastlight] = useState(true);

    const [open, setOpen] = useState(false);

    /* Handling the components*/
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.value === 'Yes'){
            setValue(true);
        }else if(e.target.value === 'No'){
            setValue(false);
        }
    };

    /* if compnay have Patient, give the my state information for report my sickness. */

    const [condition, setCondition] = useState("");
    const onhandlePatient = async(e) => {
        writeUserData(uid, Username, Userclasses)
    };

    /* Return the components */
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">아픈 곳 있나요?</FormLabel>
                            <RadioGroup
                                aria-labelledby='demo-controlled-radio-buttons-group'
                                name="controlled-radio-buttons-group"
                                value={patient}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                            { patient && <TextField id="outlined-basic" label="어디가 아픈가요?" variant="outlined"/> }

                            <FormLabel id="demo-controlled-radio-buttons-group">점호 열외하십니까?</FormLabel>
                            <RadioGroup
                                aria-labelledby='demo-controlled-radio-buttons-group'
                                name="controlled-radio-buttons-group"
                                value={absent}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                            { absent && <TextField id="outlined-basic" label="왜 열외하시나요?" variant="outlined"/> }
                            
                            <FormLabel id="demo-controlled-radio-buttons-group">연등하시나요?</FormLabel>
                            <RadioGroup
                                aria-labelledby='demo-controlled-radio-buttons-group'
                                name="controlled-radio-buttons-group"
                                value={islastlight}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                            { islastlight && <TextField id="outlined-basic" label="무슨 연등하시나요?" variant="outlined"/> }

                            <Button onClick={onhandlePatient}>보고💋</Button>
                        </FormControl>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
};

export default Patient;