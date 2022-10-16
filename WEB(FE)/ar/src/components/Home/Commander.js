import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import db from '../../database/DB_Manager';
import { UserActions } from '../../app/slice/UserSlice';
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

    async function CallLocdata(){
        const locSnapshot = await getDocs(Locquery);
        locSnapshot.forEach((loc) => {
            console.log(loc);
            const datasection={
                Name : loc.data().Username,
                Class : loc.data().Userclass,
                Located : loc.data().IsLocated
            };
            setUsers([
                ...Users,
                datasection
            ]);
        });
    };

    useEffect(()=>{
        CallLocdata();
    }, []);
    
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
        { Users.map((User) => {
            return (
                <UserLocCard key={User.Name} User={User} />
            )
        })}
        <Card className='command-rollcall'>
            { !isRollcall && 
            <>
                <div className="rollcall">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            점호 시작하겠습니다!
                        </Typography>
                    </CardContent>
                    <Button 
                        variant="contained"
                        size="small" 
                        onClick={Onrollcallhandle}
                        color="primary"
                    >
                        점호를 시작한다
                    </Button>
                </div>
            </>
            }
            { isRollcall && 
            <>
                { SoldierList.map((obj)=>{
                    return (
                        <UserRollCallCard key={obj.Name} Uobj={obj} />
                    )
                })}
                <Button 
                    variant="contained"
                    size="small" 
                    onClick={Loadhandle}
                    color="default"
                >
                    새로고침
                </Button>
                <Button 
                    variant="contained"
                    size="small" 
                    onClick={Offrollcallhandle}
                    color="secondary"
                >
                    점호 끝!
                </Button>
            </>
            }
        </Card>
    </>
    );
};

export default Commander;