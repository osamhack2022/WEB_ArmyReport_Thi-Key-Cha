import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UserActions } from '../../app/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc } from "firebase/firestore";
import db from '../../database/DB_Manager';

const Whereareyou = () => {
  const uid = useSelector((state)=>state.User.uid);
  const dispatch = useDispatch();
  const locations = [
    '생활관', '연병장', '화장실', '행정반', '사이버 지식 정보방',
    '노래방', 'PX', '병영쉼터', '흡연장', '위병소', '당신의 마음 속'
  ];

  const [loc, setLoc] = useState([]);
  const [rightnow, setRightnow] = useState(new Date());
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setLoc("");
    setLoc(value);
  };

  const onhandlelocation = async() => {
    await updateDoc(doc(db, "02155004", "본부중대", "User",`${uid}`), {
      "IsLocated" : loc
    }).then(()=>{
      alert("보고 되었습니다!");
    }).catch((error)=> {
      alert(error);
    });
  };

  return (
    <>
     <Card sx={{ minWidth: 400 }}>
      <CardContent>
        <Typography 
          sx={{ fontSize: 28 }} 
          value={rightnow}
          color="text.secondary" 
          gutterBottom
        >
        </Typography>
        <Typography variant="h5" component="div">
          어디에 계십니까?!
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            장소
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={loc}
            label="Location"
            onChange={onChange}
          >
            {locations.map((basho) => (
                <MenuItem 
                  key={basho}
                  value={basho}
                >
                  {basho}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2">
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onhandlelocation}>보고</Button>
      </CardActions>
    </Card>
    </>
  )
}

export default Whereareyou;