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

import { CallLocdata } from './hooks/HomeValue';
import UserLocCard from './UserLocCard';
import wait from '../../static/image/wait.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const RollCallCardStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 30px;
  width: calc(100%);
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  space-around : 10px;

  .command-rollcall{
    box-sizing: border-box;
  }
`

const LotateStyle = styled.div`
    align: center;
    .lotate-infinite{
        animation: rotate 1.5s ease-in infinite
    }
    @keyframe rotate{
        from{
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }to{
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
`

const LocCardStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 30px;
  width: calc(100%);
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;

  .user-info{
    box-sizing: border-box;
    flex-direction: row;
    padding-left:10px;
    padding-right:10px;
    padding-top: 10px;
  }
`

const notifyReject = (str) => {
    toast.error(str,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

const notifyWarn = (str) => {
    toast.warn(str,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

const notifySucess = (str)=>{
    toast.success(str,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

const notifyStart = (str)=>{
    toast(str,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

const Commander = () => {
    /* Variables */
    const [SoldierList, setSoldierList] = useState([]);
    const [isRollcall, setIsRollcall] = useState(false);
    const [Ready, setReady] = useState(false);
    const [element,setElement] = useState([]);
    /* Firebase 에서 User 들의 uid 정보 빼내오는 과정 */
    
    const q = query(collection(db, "02155004", "본부중대", "User"), where("IsBoss", "==" , false));
    
    useEffect(()=>{
        const getUser = CallLocdata().then((user)=>setElement(user));
        console.log('Ready value is changed');
    }, [Ready]);

    const onLocationhandle = () =>{
        setTimeout(() => {
            setReady(true);
            notifySucess("인원 위치 종합했습니다!");
        }, 1000);
    };

    const Onrollcallhandle = async() => {
        setIsRollcall(true);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(docSnap)=>{
            await updateDoc(doc(db,"02155004", "본부중대", "User",`${docSnap.id}`),{
                Timetorollcall : true,
            });
        });
        notifyWarn("점호 시작하겠습니다!");
    };

    const Offrollcallhandle = async() => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(docSnap)=>{
            await updateDoc(doc(db,"02155004", "본부중대", "User",`${docSnap.id}`),{
                Timetorollcall : false,
            });
        });
        setTimeout(() => {
            setIsRollcall(false);    
        }, 1000);
        notifySucess("점호 마치겠습니다!");
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
                    };
                    setSoldierList(prevSoldierList => [...prevSoldierList, test]);
                    await updateDoc(doc(db,"02155004", "본부중대", "User",`${data.id}`),{
                        Timetorollcall : false,
                    });
                }
            } else if(UserSnap.exists()){
                const test= {
                    Name : UserSnap.data().Username,
                    Classes : UserSnap.data().Userclass,
                    Uniqueness : false,
                    Symtom: "",
                    Isabsent : false,
                    Reason : "",
                    Islastlight : false,
                    Content : "",
                };
                setSoldierList(prevSoldierList => [...prevSoldierList, test]);
            } else {
                console.log("No Such Data");
            }
        });
    }

    return (
    <>
        <div className="user-location-info">
            <Button onClick={onLocationhandle}>인원 위치 파악</Button>
            { Ready &&
            <>  
                <LocCardStyle>
                    <div>
                        <Grid container>
                            { element.map((User, index)=>(
                                <Grid item xs={6} md={2} lg={2} key={index}>
                                    <UserLocCard  User={User} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </LocCardStyle>
            </>
            }
        </div>
        <RollCallCardStyle>
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
                    >
                        새로고침
                    </Button>
                    <Button 
                        variant="contained"
                        size="small" 
                        onClick={Offrollcallhandle}
                        color="success"
                    >
                        점호 끝!
                    </Button>
                </>
                }
            </Card>
        </RollCallCardStyle>
    </>
    );
};

export default Commander;