import React, { 
    useState,
    useEffect,
    useRef,
    useContext
} from 'react'
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import db from '../../database/DB_Manager';
import { doc, setDoc } from "firebase/firestore";
import { UserActions } from '../../app/UserSlice';

const Register = () => {
    const history = useNavigate();
    const [UserObj, setUserObj] = useState({
        'UserEmail' : '',
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
    const dispatch = useDispatch();
    const [isLoad, setisLoad] = useState(false);

    const authCtx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const UserRef = useRef();

    useEffect(()=> {
        UserRef.current?.focus();
        emailInputRef.current?.focus();
        passwordInputRef.current?.focus();
    }, [])

    const onChange = async(event) => {
        const {
            target : {name, value}
        } = event;
        await setUserObj({
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
                    throw new Error(errormessage);
                });
            }
        }).then(async(data) => {
            authCtx.login(data.idToken);
            await setDoc(doc(db,"User",`${UserObj.UserEmail}`), {
                Email : UserObj.UserEmail,
                Name : UserObj.UserName,
                Classes : UserObj.UserClasses,
                Location : UserObj.UserLocation,
                Date : UserObj.UserLastDate
            });
            dispatch(UserActions.CreateUserData(UserObj));
            dispatch(UserActions.PrintState());
            history(`/`);
        }).catch(err => {
            alert(err.message);
        });
    }

    return (
        <>
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
                                name="UserPwd"
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
                        <div className="AR_User_Classes">
                            <label htmlFor="UserClasses">
                                계급
                            </label>
                            <div className="AR_Classes_Dropdown">
                                <select name="UserClasses" onChange={onChange}>
                                    <option value="이병">이병</option>
                                    <option value="일병">일병</option>
                                    <option value="상병">상병</option>
                                    <option value="병장">병장</option>
                                </select>
                            </div>
                        </div>
                        <div className="AR_User_Located">
                            <div className="AR_User_Location">
                                <input 
                                    type="text"
                                    name="UserLocation"
                                    placeholder='??군단'
                                    required
                                />
                            </div>
                        </div>
                        <div className="AR_User_Last_Date">
                            <label htmlFor="UserLastDate">
                                전역일
                            </label>
                            <input
                                type="date"
                                name="UserLastDate"
                                id="startdate"
                                value={UserObj.UserLastDate}
                                onChange={onChange}
                                className="form-control datepicker"
                                style={{ width: "150px" }}
                                required
                            />
                        </div>
                    </div>
                    <div className="Register_Btn">
                        {!isLoad && <button type="button" onClick={onSubmit}>Sign Up</button>}
                        {isLoad && <p>Sending...</p>}
                    </div>
                </form>
            </div>
        </> 
    )
}

export default Register;