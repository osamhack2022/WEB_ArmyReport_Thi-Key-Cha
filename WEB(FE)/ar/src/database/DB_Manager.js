/*
구현해야할 기능들
1. DB 에서 로그인 ID 를 통해서 pwd 대조해서 맞는지 아닌지
2. DB 에서 로그인 성공했을 때, UserObj를 export 해주는 기능
3. Post 등록 시 DB 에 등록하는 ( Post_ID 도 따로 만들어야하나? )
4.
*/
import { initializeApp } from 'firebase/app';
import { getFirestore,doc, getDoc } from 'firebase/firestore';

import {useSelector} from 'react-redux';

const firebaseConfig = {
    apiKey: "AIzaSyBY5XFBwy8nrbepRvQdj7k4vPi3GCSBjG0",
    authDomain: "thi-key-cha.firebaseapp.com",
    databaseURL: "https://thi-key-cha-default-rtdb.firebaseio.com",
    projectId: "thi-key-cha",
    storageBucket: "thi-key-cha.appspot.com",
    messagingSenderId: "484944617909",
    appId: "1:484944617909:web:93e2e955a3ed375b5e79fc",
    measurementId: "G-X1NYBHGJBX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;