// ./src/Register.js

import React, { 
    useState,
    useEffect,
    useRef,
    useContext
} from 'react'
    
import AuthContext from '../store/auth-context';

const Register = () => {
        const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");
    const assignFromDate = e => {
        console.log(e.target.value);
        setFromDate(e.target.value);
    };
    const [UserObj, setUserObj] = useState({
        'UserId' : '',
        'UserPwd' : '',
        'UserName' : '',
        'UserClasses' : '',
        'UserLocation' : {
            'Division' : '',
            'Brigade' : '',
            'Batalion' : '',
            'Company' : ''
        },
        'UserLastDate' : new Date()
    });

    const [isLoad, setisLoad] = useState(false);

    const authCtx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const UserRef = useRef();

    const Army_Classes = [
        {id: null, value: '선택'},
        {id: 1351 , value: '이병'},
        {id: 1353 , value: '일병'},
        {id: 1355 , value: '상병'},
        {id: 1357 , value: '병장'}
    ];

    useEffect(()=> {
        UserRef.current?.focus();
        emailInputRef.current?.focus();
        passwordInputRef.current?.focus();
    }, [])

    const onDropDownBtnClick = (event) =>{
        const {
            target : {value}
        } = event;
    }

    const onChange = (event) => {
        const {
            target : {name, value}
        } = event;
        setUserObj({
            ...UserObj,
            [name] : value,
        });
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        
        setisLoad(true);
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBY5XFBwy8nrbepRvQdj7k4vPi3GCSBjG0',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                header: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            setisLoad(false);
            if(res.ok){
                let okmessage = '가입하였습니다!';
                alert(okmessage);
                return res.json();
            }else{
                return res.json().then(data =>{
                    let errormessage = '인증 실패!';
                    if (data && data.error && data.error.message){
                        errormessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                });
            }
        }).then(data => {
            authCtx.login(data.idToken);
        }).catch(err => {
            alert(err.message);
        });
    }

    return (
        <div className="AR_User_Making">
            <form onSubmit={onSubmit}>
                <h1>Register</h1>
                <div className="AR_Topic_Info">
                    <div className="Designate_Id">
                        <label htmlFor="UserId" className='UserId'>
                            ID
                            <span className='UserId_next'>

                            </span>
                        </label>
                        <input
                            name="UserEmail"
                            type="email"
                            onChange={onChange}
                            autoComplete="off"
                            ref={emailInputRef}
                            placeholder='Email 또는 ID를 입력해주세요.'
                            required
                        />
                    </div>
                    <div className="Designate_Pwd">
                        <label htmlFor="UserPwd" className='UserPwd'>
                            Password
                            <span className='UserPwd_next'>

                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={onChange}
                            ref={passwordInputRef}
                            placeholder='비밀번호를 입력해주세요'
                            required
                        />
                    </div>
                    <div className="Designate_Name">
                        <label htmlFor="UserName" className="UserName">이름</label>
                        <input 
                            name="UserName"
                            type="text" 
                            onChange={onChange}
                            placeholder="이름을 적어주세요"
                            required
                        />
                    </div>
                    
                    <div className="AR_User_Location">
                        <div className="AR_Classes_Dropdown">
                            
                        </div>
                    </div>
                    <div className="AR_User_Last_Date">
                        <label htmlFor="UserLastDate">
                            전역일
                        </label>
                        <input
                            type="date"
                            name="from"
                            id="startdate"
                            value={fromDate}
                            onChange={assignFromDate}
                            className="form-control datepicker"
                            style={{ width: "150px" }}
                        />
                    </div>
                </div>
                <div className="Register_Btn">
                    {!isLoad && <button type="button" onClick={onSubmit}>Sign Up</button>}
                    {isLoad && <p>Sending...</p>}
                </div>
            </form>
        </div>
    )
}

export default Register;