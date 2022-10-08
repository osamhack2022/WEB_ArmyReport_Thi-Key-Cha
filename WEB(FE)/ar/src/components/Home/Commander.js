import React, { useState } from 'react';

import db from '../../database/DB_Manager';
import { doc, getDocs, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { UserActions } from '../../app/UserSlice';
import UserRollCallCard from './UserRollCallCard';
import { collection, query, where } from "firebase/firestore";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { getDoc } from "firebase/firestore";

const Commander = () => {
    /* Variables */
    const [Soldier, setSoldier] = useState({
        Name : "",
        Classes : "",
        Uniqueness : false,
        Symptom : "",
        Isabsent : false,
        Reason : "",
        Islastlight : false,
        Content : ""
    });
    const [SoldierList, setSoldierList] = useState([]);
    const uid = useSelector((state)=>state.User.uid);
    const [isRollcall, setIsRollcall] = useState(false);

    /* Reference */
   
    /* Firebase 에서 User 들의 uid 정보 빼내오는 과정 */
    const q = query(collection(db, "02155004", "본부중대", "User"), where("IsBoss", "==" , false));
    
    // 지휘관, 당직사관인 아이디를 찾고 난뒤에,
    // 그 인원들을 제외하고 Data 를 가져오는 편이 속도면에서 우수

    const queryhandle = async() => {
        setIsRollcall(true);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(docSnap)=>{
            console.log(docSnap.id, " => ", docSnap.data());
            await updateDoc(doc(db,"02155004", "본부중대", "User",`${docSnap.id}`),{
                Timetorollcall : true,
            });
        });
    };

    const Loadhandle = async() => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(doc)=>{
            console.log(doc.id);
            const docRef = doc(db, "02155004", "본부중대", "RollCall",`${uid}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSoldier({
                    Uniqueness : docSnap.data().Uniqueness,
                    Symptom : docSnap.data().Symptom,
                    Isabsent : docSnap.data().Isabsent,
                    Reason : docSnap.data().Reason,
                    Islastlight : docSnap.data().Islastlight,
                    Content : docSnap.data().Content
                });
                setSoldierList([...SoldierList, Soldier]);
            } else {
                console.log("No such document!");
            }
        });
    }

    return (
    <>
        <Card sx={{ minWidth: 275 }}>
            { !isRollcall && 
            <>
                <CardContent>
                    <Typography variant="h5" component="div">
                        점호 시작하겠습니다!
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={queryhandle}>점호를 시작한다</Button>
                </CardActions> 
            </>
            }
            { isRollcall && 
            <>
                { SoldierList.map((obj)=>{
                    return (
                        <CardContent>
                            <UserRollCallCard Uobj={obj} />
                        </CardContent>
                    )
                })}
                <CardActions>
                    <Button size="small" onClick={Loadhandle}>새로고침</Button>
                </CardActions>
            </>
            }
        </Card>
    </>
    );
};

export default Commander;