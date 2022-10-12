import React, { useState } from 'react';
import { 
    doc, 
    getDoc, 
    updateDoc, 
    setDoc, 
    getDocs, 
    query,
    collection,
    where
} from "firebase/firestore";
import db from '../../../database/DB_Manager';

function createData(ID, Class, Name, Destination, Startdate, Enddate, Content, Note) {
    return {
        ID,
        Class,
        Name,
        Destination,
        Startdate,
        Enddate,
        Content,
        Note,
        history: [
            
        ],
    };
};


export async function getVacation(){
    const [v_list,setVlist] = useState([]);
    const today = new Date();
    const q = query(collection(db, "02155004", "본부중대", "Vacation"), where("Startdate", ">" , today));
    let count = 1;
    const v_Snapshot = await getDocs(q);
    v_Snapshot.forEach((res)=>{
        const user = {
            ID : `${count}`,
            Name : res.data().Username,
            Class : res.data().Userclasses,
            Destination : res.data().Destination,
            Startdate : res.data().Startdate,
            Enddate : res.data().Enddate,
            Content : res.data().Content,
            Note : res.data().Note,
        };
        setVlist([
            ...v_list,
            user
        ]);
        count += 1;
    });
    return { v_list };
};


export async function setVacation(uid, value){
    const docRef = doc(db, "02155004", "본부중대", "Vacation",`${uid}`);
    await setDoc(docRef, {
        Positive : `${value}`
    });
};