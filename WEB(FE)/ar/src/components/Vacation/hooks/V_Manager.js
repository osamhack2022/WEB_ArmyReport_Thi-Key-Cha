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

// VacationCommander.js  Functions
export async function getVacation(){
    const v_list = [];
    const toend = new Date();
    const q = query(collection(db, "02155004", "본부중대", "Vacation"), where("Examine", "==", false), where("Startdate", ">" , toend));
    let count = 1;
    const v_Snapshot = await getDocs(q);

    v_Snapshot.forEach(async(res)=>{
        const start = new Date(res.data().Startdate.seconds * 1000);
        const Startday = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
        const end = new Date(res.data().Enddate.seconds * 1000);
        const Endday = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();
        const user = {
            id : count,
            Name : res.data().Name,
            Class : res.data().Class,
            Destination : res.data().Destination,
            Startdate : Startday,
            Enddate : Endday,
            Content : res.data().Content,
            Note : res.data().Note,
        };
        v_list.push(user);
        count += 1;
    });
    return v_list;
};

export async function StartToday(){
    let v_list = [];
    let count = 0;
    const end = new Date();
    const yesterday = new Date(end.getDate()-1);
    const today = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();
    const sq = query(collection(db, "02155004", "본부중대", "Vacation"), where("Startdate", ">" , yesterday));

    const v_Snapshot = await getDocs(sq);
    v_Snapshot.forEach((res)=>{
        const start = new Date(res.data().Startdate.seconds * 1000);
        const startdate = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate(); 
        if (startdate == today){
            const user = {
                id : count,
                Start : res.data().Class+ " " + res.data().Name,
            };
            v_list.push(user);
            count += 1;
        }
    });
    return v_list;
};

export async function EndToday(){
    let v_list = [];
    let count = 0;
    const end = new Date();
    const yesterday = new Date(end.getDate()-1);
    const today = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();
    const eq = query(collection(db, "02155004", "본부중대", "Vacation"), where("Enddate", ">" , yesterday));

    const v_Snapshot = await getDocs(eq);
    v_Snapshot.forEach((res)=>{
        const end = new Date(res.data().Enddate.seconds * 1000);
        const enddate = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate(); 
        if (enddate == today){
            const user = {
                id : count,
                End : res.data().Class+ " " + res.data().Name,
            };
            v_list.push(user);
            count += 1;
        }
    });
    return v_list;
};

export async function setVacation(uid, value){
    const docRef = doc(db, "02155004", "본부중대", "Vacation",`${uid}`);
    if (value===true){
        await updateDoc(docRef, {
            Positive : 1,
            Examine : true,
        });
    }else if(value === false){
        await updateDoc(docRef, {
            Positive : -1,
            Examine : true,
        });
    }else{
        console.log("wrong value inputed");
    }
};

export async function getId(name){
    let uid = null;
    const q = query(collection(db, "02155004", "본부중대", "User"), where("Username", "==", name));
    const v_Snapshot = await getDocs(q);
    v_Snapshot.forEach((val)=>{
        uid = val.data().Useremail;
        uid = uid.split('@');
    });
    return uid;
};

export function CombineRows(StartRows, EndRows){
    let count = 1;
    let OutcastRows = [];

    if (StartRows.length === 0 && EndRows.length === 0){
        return 0;
    }else if(StartRows.length === 0){
        for(let k=0; k< EndRows.length; k++){
            OutcastRows.push({
                id : count,
                Home : EndRows[k].End,
            });
            count += 1;
        }
        return OutcastRows;
    }else if(EndRows.length === 0){
        for(let k=0; k< StartRows.length; k++){
            OutcastRows.push({
                id : count,
                Away : StartRows[k].Start,
            });
            count += 1;
        }
        return OutcastRows;
    }
    if (StartRows.length < EndRows.length ){
        for(let k=0; k < EndRows.length; k++){
            if (k === StartRows.length){
                OutcastRows.push({
                    id : count,
                    Home : EndRows[k].End,
                });
                count += 1;
            }else{
                OutcastRows.push({
                    id: count,
                    Away : StartRows[k].Start,
                    Home : EndRows[k].End,
                });
                count += 1;
            }
        }
    }else if(StartRows.length > EndRows.length){
        for(let k = 0; k < StartRows.length;k++){
            if (k === EndRows.length){
                OutcastRows.push({
                    id : count,
                    Away : StartRows[k].Start,
                });
                count += 1;
            }else{
                OutcastRows.push({
                    id : count,
                    Away : StartRows[k].Start,
                    Home : EndRows[k].End,
                });
                count += 1;
            }
        } 
    }else{
        for(let k = 0; k< StartRows.length;k++){
            OutcastRows.push({
                id : count,
                Away : StartRows[k].Start,
                Home : EndRows[k].End,
            });
            count += 1;
        }
    }
    return OutcastRows;
};


// PersonPage functions

export async function getUserVacation(uid){
    let UserData = {
        'Startdate' : new Date(),
        'Enddate' : new Date(),
        'Content' : '',
        'Examine' : false,
    };
    const UserRef = doc(db, '02155004', '본부중대', 'Vacation', `${uid}`);
    const docSnap = await getDoc(UserRef);

    if(docSnap.exists()){
        if(docSnap.data().Positive === false || docSnap.data().Positive === true){
            UserData.Startdate = new Date(docSnap.data().Startdate.seconds * 1000);
            UserData.Enddate = new Date(docSnap.data().Enddate.seconds * 1000);
            UserData.Content = docSnap.data().Content;
            UserData.Examine = docSnap.data().Examine;
            UserData.Positive = docSnap.data().Positive;
        }else{
            UserData.Startdate = new Date(docSnap.data().Startdate.seconds * 1000);
            UserData.Enddate = new Date(docSnap.data().Enddate.seconds * 1000);
            UserData.Content = docSnap.data().Content;
            UserData.Examine = docSnap.data().Examine;
        }        
    }else{
        return false;
    }
    return UserData;
};

export async function getApplication(uid){
    let UserData = {
        'Startdate' : new Date(),
        'Enddate' : new Date(),
        'Content' : '',
        'Examine' : false,
    };
    const UserRef = doc(db, '02155004', '본부중대', 'Vacation', `${uid}`);
    const docSnap = await getDoc(UserRef);
    if(docSnap.exists()){
        if(docSnap.Examine == false){
            UserData.Startdate = new Date(docSnap.data().Startdate.seconds * 1000);
            UserData.Enddate = new Date(docSnap.data().Enddate.seconds * 1000);
            UserData.Content = docSnap.data().Content;
        }
    }else{
        return true;
    }
    return UserData;
};