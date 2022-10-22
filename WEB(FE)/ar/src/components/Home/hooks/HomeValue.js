import React, { useEffect, useState } from 'react';

import db from '../../../database/DB_Manager';

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

export async function CallLocdata(){

    /* Variables */
    const Users = [];

    /* Queries */
    const q = query(collection(db, "02155004", "본부중대", "User"), where("IsBoss", "==" , false));

    /* Handling function */
    const locSnapshot = await getDocs(q);
    locSnapshot.forEach((loc) => {
        const datasection={
            Name : loc.data().Username,
            Class : loc.data().Userclass,
            Located : loc.data().IsLocated,
            IsVacation : loc.data().IsVacation
        };
        Users.push(datasection);
    });

    return Users;
};