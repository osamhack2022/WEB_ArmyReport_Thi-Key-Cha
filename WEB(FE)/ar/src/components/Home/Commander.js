import React, { useEffect, useState } from 'react';

import db from '../../database/DB_Manager';
import { UserActions } from '../../slice/UserSlice';
import UserRollCallCard from './UserRollCallCard';
import { 
    doc, 
    onSnapshot,
    getDoc, 
    getDocs, 
    updateDoc, 
    collection, 
    query, 
    where 
} from "firebase/firestore";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserLocCard from './UserLocCard';

const Commander = () => {

    /* Variables */
    const [SoldierList, setSoldierList] = useState([]);
    const [isRollcall, setIsRollcall] = useState(false);

    const [Users, setUsers] = useState([]);

    /* Firebase 에서 User 들의 uid 정보 빼내오는 과정 */
    const q = query(collection(db, "02155004", "본부중대", "User"), where("IsBoss", "==" , false));

    /* Firebase 에서 user들의 loc 정보를 빼내오는 과정 */
    const Locquery = query(collection(db, "02155004", "본부중대", "User"), where("IsLocated", "!=" , ""));



    const Locationhandle = onSnapshot(Locquery, (querySnapshot) => {
        querySnapshot.forEach((dataSnap)=>{
            const info = {
                Name : dataSnap.data().Username,
                Class : dataSnap.data().Userclass,
                Located : dataSnap.data().IsLocated
            };
            setUsers([
                ...Users,
                info
            ]);
        });
    });
    
    // 지휘관, 당직사관인 아이디를 찾고 난뒤에,
    // 그 인원들을 제외하고 Data 를 가져오는 편이 속도면에서 우수
    
    const Onrollcallhandle = async() => {
        setIsRollcall(true);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(docSnap)=>{
            console.log(docSnap.id, " => ", docSnap.data());
            await updateDoc(doc(db,"02155004", "본부중대", "User",`${docSnap.id}`),{
                Timetorollcall : true,
            });
        });
    };

    const Offrollcallhandle = async() => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(docSnap)=>{
            console.log(docSnap.id, " => ", docSnap.data());
            await updateDoc(doc(db,"02155004", "본부중대", "User",`${docSnap.id}`),{
                Timetorollcall : false,
            });
        });
        setTimeout(() => {
            setIsRollcall(false);    
        }, 1000);
    };

    const Loadhandle = async() => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(data)=>{
            const docRef = doc(db, "02155004", "본부중대", "RollCall",`${data.id}`);
            const UserRef = doc(db, "02155004", "본부중대", "User",`${data.id}`);
            const docSnap = await getDoc(docRef);
            const UserSnap = await getDoc(UserRef);
            if (docSnap.exists() && UserSnap.exists()) {
                if (UserSnap.data().Timetorollcall){
                    const test = {
                        Name : UserSnap.data().Username,
                        Classes : UserSnap.data().Userclass,
                        Uniqueness : docSnap.data().Uniqueness,
                        Symptom : docSnap.data().Symptom,
                        Isabsent : docSnap.data().Isabsent,
                        Reason : docSnap.data().Reason,
                        Islastlight : docSnap.data().Islastlight,
                        Content : docSnap.data().Content
                    }
                    setSoldierList(prevSoldierList => [...prevSoldierList, test]);
                    await updateDoc(doc(db,"02155004", "본부중대", "User",`${data.id}`),{
                        Timetorollcall : false,
                    });
                }
            } else {
                console.log("No such document!");
            }
        });
    }

    return (
    <>
        <Card sx={{ minWidth: 275 }}>

            <CardContent>
                { Users.map((User) => {
                    return (
                        <UserLocCard User={User} />
                    )
                })}
                <CardActions>
                    <Button size="small" onClick={Locationhandle}>너네 다 어디있냐?</Button>
                </CardActions>
            </CardContent>
            { !isRollcall && 
            <>
                <CardContent>
                    <Typography variant="h5" component="div">
                        점호 시작하겠습니다!
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={Onrollcallhandle}>점호를 시작한다</Button>
                </CardActions> 
            </>
            }
            { isRollcall && 
            <>
                { SoldierList.map((obj)=>{
                    return (
                        <UserRollCallCard key={obj.Name} Uobj={obj} />
                    )
                })}
                <CardActions>
                    <Button size="small" onClick={Loadhandle}>새로고침</Button>
                    <Button size="small" onClick={Offrollcallhandle}>점호 끝!</Button>
                </CardActions>
            </>
            }
        </Card>
    </>
    );
};

export default Commander;