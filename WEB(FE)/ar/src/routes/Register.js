import React, { 
useState,
useEffect,
useRef,
} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{8,16}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const UserRef = useRef();
    const errRef = useRef();
    
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
        'UserLastDate' : Date.now()
    });

    const [errMsg, setErrMsg] = useState('');

    const [validId, setvalidId] = useState(false);
    const [validPwd, setvalidPwd] = useState(false);
    const [validUserName, setvalidUserName] = useState(false);
    const [validUserLocation, setvalidUserLocation] = useState(false);
    const [validUserLastDate, setvalidUserLastDate] = useState(false);

    const [userFocus, setUserFocus] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const { UserId, UserPwd, UserName, UserClasses, UserLocation, UserLastDate} = UserObj;

    const onDropDownBtnClick = () =>{
        const change = document.getElementById("dropdown_classes");
        const Army_class = document.getElementsByClassName("dropdown_class");
        change.innerText = Army_class.innerText;
    }

    useEffect(()=> {
        UserRef.current?.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(UserObj.UserId);
        console.log(result);
        console.log(UserObj.UserId);
        setvalidId(result);
    }, [UserObj.UserId]);

    useEffect(() => {
        const result = PWD_REGEX.test(UserObj.UserPwd);
        console.log(result);
        console.log(UserObj.UserPwd);
        setvalidPwd(result);
        const match = UserObj.UserPwd === matchPwd;
        setValidMatch(match);
    }, [UserObj.UserPwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [UserObj.UserId, UserObj.UserPwd, matchPwd]);

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
        
    }


    return (
        <div className="AR_User_Making">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}  aria-live="assertive">
                {errMsg}
            </p>
            <form onSubmit={onSubmit}>
                <h1>Register</h1>
                <div className="AR_Topic_Info">
                    <div className="Designate_Id">
                        <label htmlFor="UserId" className='UserId'>
                            ID
                            <span className={validUserName ? "valid" : "hide"}>
                                됐음!
                            </span>
                            <span className={validId || !UserObj.id ? "hide" : "invalid"}>
                                안됐음.
                            </span>
                        </label>
                        <input
                            name="UserId"
                            type="text"
                            onChange={onChange}
                            autoComplete="off"
                            placeholder='ID를 입력해주세요.'
                            required
                            aria-invalid={validId ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                    </div>
                    <p id="uidnote" className={userFocus && UserId && 
                    !validId ? "instructions" : "offscreen"}>
                        8글자에서 16글자 사이여야 합니다. <br/>
                        반드시 영문으로 시작되어야 합니다. <br/>
                        문자, 숫자, _ , !, @, #, $, % 등이 가능 합니다.
                    </p>
                    <div className="Designate_Pwd">
                        <label htmlFor="UserPwd" className='UserPwd'>
                            Password
                            <span className={validPwd ? "valid" : "hide"}>
                                됐음.
                            </span>
                            <span className={validPwd || !UserObj.UserPwd ? "hide" : "invalid"}>
                                안됐음.
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={onChange}
                            placeholder='비밀번호를 입력해주세요'
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={()=> setPwdFocus(true)}
                            onBlur={()=>setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instruction" :
                        "offscreen"}>
                            8글자에서 24글자 사이여야 합니다. <br/>
                            대문자, 소문자, 숫자, 특수문자를 포함해야 합니다. <br/>
                            다음과 같은 특수문자를 허용합니다. ! @ # $ % <br/>
                        </p>
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
                    <div className="AR_Classes_Dropdown">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown_classes">
                                선택
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={onDropDownBtnClick} className="dropdown_class">이병</Dropdown.Item>
                                <Dropdown.Item onClick={onDropDownBtnClick} className="dropdown_class">일병</Dropdown.Item>
                                <Dropdown.Item onClick={onDropDownBtnClick} className="dropdown_class">상병</Dropdown.Item>
                                <Dropdown.Item onClick={onDropDownBtnClick} className="dropdown_class">병장</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="AR_User_Location">

                    </div>
                    <div className="AR_User_Last_Date">

                    </div>
                </div>
                <button type="button">Sign Up</button>
            </form>
        </div>
    )
}

export default Register;