import React, { 
    useState,
    useEffect,
    useRef
} from 'react'
import { useNavigate } from 'react-router-dom';

import db from '../../database/DB_Manager';
import { doc, setDoc } from "firebase/firestore";
import { Cropsdata, Divisiondata, Bataliondata } from './Unitdata';

import { AuthActions } from '../../app/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space
} from 'antd';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';


const Register = () => {
    const history = useNavigate();
    const [userLocation, setUserLocation] = useState({
        'Division' : '',
        'Brigade' : '',
        'Batalion' : '',
        'Company' : ''
    });
    const [UserObj, setUserObj] = useState({
        'UserEmail' : '',
        'UserName' : '',
        'UserClasses' : '',
        'UserLocation' : userLocation,
        'UserLastDate' : new Date()
    });
    const [isLoad, setisLoad] = useState(false);

    const dispatch = useDispatch();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const army_classes = [
        '이병','일병','상병','병장','하사','중사','상사','원사','준위',
        '소위','중위','대위','소령','중령','대령','준장','소장','중장','대장'
    ];

    useEffect(()=> {
        emailInputRef.current?.focus();
        passwordInputRef.current?.focus();
    }, [])

    const [Crop, setCrop] = useState(Cropsdata[4]);
    const [Division, setDivision] = useState(Divisiondata[Crop][0]);
    const [Batalion, setBatalion] = useState(Bataliondata[Division][0]);

    const onCropChange = (value) => {
        setCrop(Cropsdata[value]);
        setDivision(Divisiondata[value][0]);
    };
    const onDivisionChange = (value) => {
        setDivision(value);
        setBatalion(Bataliondata[value][0]);
    };
    const onBatalionChange = (value) => {
        setBatalion(value);
    }

    const onChange = async(event) => {
        const {
            target : {name, value}
        } = event;
        await setUserObj({
            ...UserObj,
            [name] : value,
        });
    };

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
            dispatch(AuthActions.login(data.idToken));
            const uid = enteredEmail.split('@');
            await setDoc(doc(db, "02155004", "본부중대", "User",`${uid[0]}`), {
                /* UUID 를 이용해 UID 변수를 만들 생각입니다. */
                Useremail : UserObj.UserEmail,
                Username : UserObj.UserName,
                Userclass : UserObj.UserClasses,
                Userlocated : UserObj.UserLocation,
                Userlastdate : UserObj.UserLastDate
            });
            history(`/`);
        }).catch(err => {
            alert(err.message);
        });
    }
    // 소속부대는 dropdown 으로 판별할 생각이며, 중대급은 Input type=text 로 받아 처리할 예정입니다.
    return (
        <Form
            labelCol={{
            span: 4,
            }}
            wrapperCol={{
            span: 14,
            }}
            layout="horizontal"
        >
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="horizontal"
                onSubmit={onSubmit}
            >
                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    }]}
                >
                    <Input 
                        ref={emailInputRef}
                    />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    }]}
                    
                >
                    <Input.Password 
                        ref={passwordInputRef}
                    />
                </Form.Item>
                <Form.Item label="이름" >
                    <Input />
                </Form.Item>
                <Form.Item label="계급">
                <Select>
                    <Select.Option value="userclass" onChange={onChange}>
                        {army_classes.map((item)=>{
                            {item}
                        })}
                    </Select.Option>
                </Select>
                </Form.Item>
                <Form.Item label='전역일'>
                    <DatePicker 
                        name='Userlastdate'
                        defaultValue={moment(new Date(), dateFormat)} 
                        format={dateFormat} 
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label='소속부대'>
                    <Select
                        defaultValue={Cropsdata[0]}
                        style={{
                        width: 120,
                        }}
                        onChange={onCropChange}
                    >
                        {Cropsdata.map((crop) => (
                        <Option key={crop}>{crop}</Option>
                        ))}
                    </Select>
                    <Select
                        style={{
                        width: 120,
                        }}
                        value={Divisiondata[0]}
                        onChange={onDivisionChange}
                    >
                        {Divisiondata[Crop].map((division) => (
                        <Option key={division}>{division}</Option>
                        ))}
                    </Select>
                    <Select
                        style={{
                        width: 120,
                        }}
                        value={Bataliondata[0]}
                        onChange={onBatalionChange}
                    >
                        {Bataliondata[Division].map((batalion) => (
                        <Option key={batalion}>{batalion}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}    
                >
                    <Button onSubmit={onSubmit}>회원가입</Button>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button>취소</Button>
                </Form.Item>
            </Form>
        </Form> 
    )
}

export default Register;