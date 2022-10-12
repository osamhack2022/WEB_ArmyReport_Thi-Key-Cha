import React from 'react';
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

const v_list = [];

async function synthesis(q){
    let count = 1;
    const v_Snapshot = await getDocs(q);
    v_Snapshot.forEach((v)=>{
        const user = {
            ID : `${count}`,
            Name : v.data().Username,
            Class : v.data().Userclasses,
            Destination : v.data().Destination,
            Startdate : v.data().Startdate,
            Enddate : v.data().Enddate,
            Content : v.data().Content,
            Note : v.data().Note,
        };
        count += 1;
    });
};

export async function getVacation(){
    const today = new Date();
    const q = query(collection(db, "02155004", "본부중대", "Vacation"), where("Startdate", "<" , `${today}`));
    await synthesis(q);
    return {v_list};
};

export async function setVacation(uid, value){
    const docRef = doc(db, "02155004", "본부중대", "Vacation",`${uid}`);
    await setDoc(docRef, {
        Positive : `${value}`
    });
};