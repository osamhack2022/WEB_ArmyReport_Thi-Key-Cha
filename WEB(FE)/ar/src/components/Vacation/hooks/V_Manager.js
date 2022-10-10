import React from 'react';
import { doc, getDoc, updateDoc, setDoc, getDocs } from "firebase/firestore";

export async function getVacation(){
    const today = new Date();
    const v_list = [];
    let count = 1;
    const q = query(collection(db, "02155004", "본부중대", "Vacation"), where("Startdate", "<" , `${today}`));
    
    async function synthesis(){
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
            v_list.push(user);
            count += 1;
        });
    };
    synthesis();
    return {v_list};
};

export async function setVacation(uid, value){
    const docRef = doc(db, "02155004", "본부중대", "Vacation",`${uid}`);
    await setDoc(docRef, {
        Positive : `${value}`
    });
};