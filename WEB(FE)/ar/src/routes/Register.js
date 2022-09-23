import React, { 
useState,
useEffect,
useRef,
} from 'react'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{8,16}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const UserRef = useRef(null);
    const errRef = useRef(null);
    
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

    const [validId, setvalidId] = useState(false);
    const [validPwd, setvalidPwd] = useState(false);
    const [validUserName, setvalidUserName] = useState(false);
    const [validUserLocation, setvalidUserLocation] = useState(false);
    const [validUserLastDate, setvalidUserLastDate] = useState(false);

    const { UserId, UserPwd, UserName, UserClasses, UserLocation, UserLastDate} = UserObj;

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

    const ClassDropDown = () => {
        document.getElementsByClassName("Dropdown_Btn").classList.toggle('show');
    };
    function DropDown(e){
        if(e.target.matches('Dropdown-Content')){
            let dropdowns = document.getElementByClassName('Dropdown-Content');
            let i;
            for (i=0;i<dropdowns.length();i++){
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')){
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    return (
        <div className="AR_User_Making">
            <form onSubmit={onSubmit}>
                <h1>Register</h1>
                <div className="AR_Topic_Info">
                    <div className="Designate_Id">
                        <label For="UserId" className='UserId'>ID</label>
                        <input
                            name="UserId"
                            type="text"
                            onChange={onChange}
                            placeholder='ID를 입력해주세요.'
                            required
                        />
                    </div>
                    <div className="Designate_Pwd">
                        <label For="UserPwd" className='UserPwd'>Password</label>
                        <input
                            name="UserPwd"
                            type="password"
                            onChange={onChange}
                            placeholder='비밀번호를 입력해주세요'
                            required
                        />
                    </div>
                    <div className="Designate_Name">
                        <label For="UserName" className="UserName">이름</label>
                        <input 
                            name="UserName"
                            type="text" 
                            onChange={onChange}
                            placeholder="이름을 적어주세요"
                            required
                        />    
                    </div>
                    <div className="AR_Classes_Dropdown">
                        <button onClick={ClassDropDown} className='Dropdown_Btn'>계급</button>
                        <div className="Dropdown-Content">
                            <span>이병</span>
                            <span>일병</span>
                            <span>상병</span>
                            <span>병장</span>
                        </div>
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