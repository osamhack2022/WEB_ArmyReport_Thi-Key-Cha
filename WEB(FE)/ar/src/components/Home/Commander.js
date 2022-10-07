import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getDatabase } from "firebase/database";
import { doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import {UserActions} from '../../app/UserSlice';

const database = getDatabase();
const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  capital: true
});

const Commander = () => {
    /* Variables */
    const [isSoldier, setIsSoldier] = useState([]);
    const uid = useSelector((state)=>state.User.uid);
    /* Reference */

    /* Firebase 에서 User 들의 uid 정보 빼내오는 과정 */

    const [Userlocs, setUserLocs] = useState([]);
    const q = query(collection(db, "02155004", "본부중대", "User"), where("IsBoss", "==" , false));
    
    // 지휘관, 당직사관인 아이디를 찾고 난뒤에,
    // 그 인원들을 제외하고 Data 를 가져오는 편이 속도면에서 우수

    const queryhandle = async() => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(doc)=>{
            console.log(doc.id, " => ", doc.data());
            await updateDoc(doc(db,"02155004", "본부중대", "User",`${doc.id}`),{
                Timetorollcall : true,
            });
        });
    };

    return (
    <>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    점호 시작하겠습니다!
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">점호를 시작한다</Button>
            </CardActions>
        </Card>
    </>
    );
};

export default Commander;