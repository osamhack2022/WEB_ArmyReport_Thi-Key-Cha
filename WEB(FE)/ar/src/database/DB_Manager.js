/*
구현해야할 기능들
1. DB 에서 로그인 ID 를 통해서 pwd 대조해서 맞는지 아닌지
2. DB 에서 로그인 성공했을 때, UserObj를 export 해주는 기능
3. Post 등록 시 DB 에 등록하는 ( Post_ID 도 따로 만들어야하나? )
4.
*/
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCOOTGrItVa4Ul8YcitFoUnc1Z1HKj4J9k",
    authDomain: "thikeycha.firebaseapp.com",
    projectId: "thikeycha",
    storageBucket: "thikeycha.appspot.com",
    messagingSenderId: "594210782648",
    appId: "1:594210782648:web:cdc18225053156f949234d",
    measurementId: "G-PGFQ4H039P"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;